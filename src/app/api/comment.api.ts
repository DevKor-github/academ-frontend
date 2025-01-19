import { accessToken } from '@/auth/auth.util';

export async function checkUpdateComment(comment_id: number) {
  const token = accessToken();

  const url = `/api/course/start-update-comment?commend_id=${comment_id}`;

  return fetch(new URL(url, process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json() as Promise<ApiResponse<Course & AcdCommentEditReq>>);
}

export async function updateComment(input: AcdCommentEditReq) {
  const token = accessToken();

  return fetch(new URL('api/course/update-comment', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json() as Promise<ApiResponse<number>>);
}

export async function reportComment(input: AcdCommentReportReq) {
  const token = accessToken();

  return fetch(new URL('api/course/report-comment', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json() as Promise<ApiResponse<unknown>>);
}

export async function likeComment(input: AcdCommentRelated) {
  const token = accessToken();

  return fetch(new URL('api/course/like-comment', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json() as Promise<ApiResponse<AcdComment[]>>);
}

export async function deleteComment(input: AcdCommentRelated) {
  const token = accessToken();

  return fetch(new URL('/api/course/delete-comment', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json() as Promise<ApiResponse<Omit<Course, 'isBookmark'>>>);
}

export async function startNewComment(input: ReqCourseRelated) {
  const token = accessToken();

  const url = new URL('/api/course/start-insert-comment', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  Object.entries(input).forEach(([k, v]) => url.searchParams.append(k, v.toString()));

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json() as Promise<ApiResponse<Course>>);
}

export async function insertComment(input: AcdCommentNewReq) {
  const token = accessToken();

  return fetch(new URL('/api/course/insert-comment', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json() as Promise<ApiResponse<number>>);
}
