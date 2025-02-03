'use server';

import { AcdCommentNewReq } from '@/types/comment.types';
import { fetchAPIAuth, POST, withJsonBody, withStatusCode } from '@/util/fetch.util';
import { revalidateTag } from 'next/cache';

export async function createComment(input: AcdCommentNewReq) {
  return fetchAPIAuth('/api/course/insert-comment', await POST().then(withJsonBody(input)))
    .then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<number>>)
    .then((v) => {
      revalidateTag('course');
      return v;
    });
}
