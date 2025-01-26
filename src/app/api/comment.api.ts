import type {
  AcdComment,
  AcdCommentEditReq,
  AcdCommentNewReq,
  AcdCommentRelated,
  AcdCommentReportReq,
} from '@/types/comment.types';
import type { Course } from '@/types/course.types';
import { fetchAPIAuth, GET, POST, searchParamString, withJsonBody, withStatusCode } from '@/util/fetch.util';
import { revalidateTag } from 'next/cache';

export async function updateCommentPrepare(comment_id: number) {
  return fetchAPIAuth(`/api/course/start-update-comment${searchParamString({ comment_id }, '?')}`, await GET()).then(
    (v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<Course & AcdCommentEditReq>>,
  );
}

export async function updateComment(input: AcdCommentEditReq) {
  return fetchAPIAuth(`api/course/update-comment`, await POST().then(withJsonBody(input))).then(
    (v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<number>>,
  );
}

export async function createReportComment(input: AcdCommentReportReq) {
  return fetchAPIAuth('api/course/report-comment', await POST().then(withJsonBody(input))).then(
    (v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<unknown>>,
  );
}

export async function createLikeComment(input: AcdCommentRelated) {
  return fetchAPIAuth('api/course/like-comment', await POST().then(withJsonBody(input))).then(
    (v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<AcdComment[]>>,
  );
}

export async function deleteComment(input: AcdCommentRelated) {
  return fetchAPIAuth('/api/course/delete-comment', await POST().then(withJsonBody(input))).then(
    (v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<Omit<Course, 'isBookmark'>>>,
  );
}

export async function createCommentPrepare(input: ReqCourseRelated) {
  return fetchAPIAuth(`/api/course/start-insert-comment${searchParamString({ ...input }, '?')}`, {
    method: 'GET',
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<Course>>);
}

export async function createComment(input: AcdCommentNewReq) {
  return fetchAPIAuth('/api/course/insert-comment', await POST().then(withJsonBody(input)))
    .then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<number>>)
    .then((v) => {
      revalidateTag('course');
      return v;
    });
}
