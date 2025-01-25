import { IsCourse } from '@/lib/type/IsCourse';
import type { AcdComment } from '@/types/comment.type';
import { fetchAPIAuth, GET, searchParamString, withStatusCode } from '@/util/fetch.util';

export async function searchCourse(input: ReqSearchCourse) {
  const json = await fetchAPIAuth(`/api/course/search${searchParamString({ ...input }, '?')}`, {
    method: 'GET',
  }).then(
    (v) =>
      v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<Course[] | CourseOnly[]> & { cursor: number }>,
  );

  json.cursor = input.page;
  return json;
}

export async function searchCourseCount(input: ReqSearch) {
  const json = await fetchAPIAuth(`/api/course/search/count-result${searchParamString({ ...input }, '?')}`, {
    method: 'GET',
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<number>>);
  return json;
}

export async function courseDetail(course_id: number) {
  const input = { course_id, order: 'NEWEST', page: 1 } satisfies ReqCourseDetail;
  return fetchAPIAuth(`/api/course/detail${searchParamString(input, '?')}`, await GET()).then(
    (v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<CourseOnly | Course>>,
  );
}

export async function courseDetailWithComments(input: ReqCourseDetail) {
  const json = await fetchAPIAuth(`/api/course/detail${searchParamString({ ...input }, '?')}`, {}).then(
    (v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<CourseOnly | Course>>,
  );

  if (json.status !== 'SUCCESS') {
    return Promise.reject({
      ...json,
      data: [],
      cursor: input.page,
    } as ApiResponse<AcdComment[]> & { cursor: number });
  }

  if (IsCourse(json.data)) {
    return {
      ...json,
      data: json.data?.comments,
      cursor: input.page,
    } as ApiResponse<AcdComment[]> & { cursor: number };
  } else {
    return Promise.reject({
      ...json,
      status: 'ERROR',
      statusCode: 500,
      data: [],
      message: '댓글을 불러오는데 실패했습니다',
      cursor: input.page,
    } as ApiResponse<AcdComment[]> & { cursor: number });
  }
}

export async function toggleBookmark(input: ReqCourseRelated) {
  return fetchAPIAuth(`/api/course/bookmark${searchParamString({ ...input }, '?')}`, {
    method: 'GET',
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<string>>);
}
