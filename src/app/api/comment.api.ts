import type {
  AcdComment,
  AcdCommentEditReq,
  AcdCommentNewReq,
  AcdCommentRelated,
  AcdCommentReportReq,
} from '@/types/comment.types';
import type { Course } from '@/types/course.types';
import { fetchAPIAuth, searchParamString, withStatusCode } from '@/util/fetch.util';
import { revalidateTag } from 'next/cache';

export async function checkUpdateComment(comment_id: number) {
  return fetchAPIAuth(`/api/course/start-update-comment${searchParamString({ comment_id }, '?')}`, {
    method: 'GET',
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<Course & AcdCommentEditReq>>);
}

export async function updateComment(input: AcdCommentEditReq) {
  return fetchAPIAuth(`api/course/update-comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<number>>);
}

export async function reportComment(input: AcdCommentReportReq) {
  return fetchAPIAuth('api/course/report-comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<unknown>>);
}

export async function likeComment(input: AcdCommentRelated) {
  return fetchAPIAuth('api/course/like-comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<AcdComment[]>>);
}

export async function deleteComment(input: AcdCommentRelated) {
  return fetchAPIAuth('/api/course/delete-comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<Omit<Course, 'isBookmark'>>>);
}

export async function startNewComment(input: ReqCourseRelated) {
  return fetchAPIAuth(`/api/course/start-insert-comment${searchParamString({ ...input }, '?')}`, {
    method: 'GET',
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<Course>>);
}

export async function insertComment(input: AcdCommentNewReq) {
  return fetchAPIAuth('/api/course/insert-comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<number>>)
    .then((v) => {
      revalidateTag('course');
      return v;
    });
}
