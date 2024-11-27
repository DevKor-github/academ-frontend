'use server';

import { accessToken } from '@/lib/auth.util';
import { COOKIE_AUTH_TOKEN, COOKIE_REFRESH_TOKEN } from '@/lib/directive.server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

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

export async function MyPageUpdateBasic(req: UpdateProfileReq) {
  const token = await accessToken();

  const ret = await fetch(new URL('api/mypage/update-basic', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  return ret.json();
}

export async function MyPageUpdatePW(req: UpdatePWReq) {
  const token = await accessToken();

  const ret = await fetch(new URL('api/mypage/update-password', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  return ret.json();
}

export async function MyPageDeleteAccount(req: { password: string }) {
  const token = await accessToken();

  const ret = await fetch(new URL('api/mypage/delete-profile', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  const json = await ret.json();

  if (json.status === 'SUCCESS') {
    (await cookies()).delete(COOKIE_AUTH_TOKEN);
    (await cookies()).delete(COOKIE_REFRESH_TOKEN);
    revalidatePath('/', 'layout');
  }

  return json;
}
