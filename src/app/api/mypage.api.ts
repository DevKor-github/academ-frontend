'use server';

import { accessToken } from '@/lib/auth.util';

export async function getMyPageBasics() {
  const access = await accessToken();

  return await fetch(new URL('api/mypage/info', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then((v) => v.json());
}

export async function getMyPageBookmarksCount() {
  const token = await accessToken();

  return await fetch(new URL('api/mypage/count-my-bookmarks', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json());
}

export async function getMyPageCommentsCount() {
  const token = await accessToken();

  return await fetch(new URL('api/mypage/count-my-comments', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json());
}

export async function MyPageBookmarks(page: number) {
  const token = await accessToken();

  const url = new URL('api/mypage/my-bookmarks', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  new URLSearchParams({ page: page.toString() }).forEach((v, k) => url.searchParams.append(k, v));
  const json = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json());

  json.cursor = page;

  return json;
}

export async function MyPageComments(page: number) {
  const token = await accessToken();

  const url = new URL('api/mypage/my-comments', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  new URLSearchParams({ page: page.toString() }).forEach((v, k) => url.searchParams.append(k, v));
  const json = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((v) => v.json());

  json.cursor = page;

  return json;
}

export async function MyPageBuyMembership(item: string) {
  const token = await accessToken();

  const ret = await fetch(new URL('api/mypage/buy-access-authority', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item: item }),
  });

  return ret.json();
}
