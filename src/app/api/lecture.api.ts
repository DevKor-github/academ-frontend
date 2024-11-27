'use server';

import { accessToken } from '@/auth/auth.util';
import { IsCourse } from '@/lib/type/IsCourse';

export async function search(input: ReqSearchCourse) {
  const token = accessToken();

  const url = new URL('/api/course/search', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  Object.entries(input).forEach(([name, value]) => url.searchParams.append(name, value.toString()));

  const json = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json() as Promise<ApiResponse<Course[] | CourseOnly[]> & { cursor: number }>);

  json.cursor = input.page;

  return json;
}

export async function courseDetail(course_id: number) {
  const token = await accessToken();

  const input = { course_id, order: 'NEWEST', page: 1 } satisfies ReqCourseDetail;

  const url = new URL('/api/course/detail', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  Object.entries(input).forEach(([k, v]) => url.searchParams.append(k, String(v)));

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json() as Promise<ApiResponse<CourseOnly | Course>>);
}

export async function courseDetailWithComments(input: ReqCourseDetail) {
  const token = await accessToken();

  const url = new URL('/api/course/detail', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  Object.entries(input).forEach(([k, v]) => url.searchParams.append(k, String(v)));

  const json = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json() as Promise<ApiResponse<CourseOnly | Course>>);

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
  const token = await accessToken();

  const url = new URL('/api/course/bookmark', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  Object.entries(input).forEach(([k, v]) => url.searchParams.append(k, String(v)));

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json() as Promise<ApiResponse<string>>);
}
