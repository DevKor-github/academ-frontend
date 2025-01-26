'use server';

import { fetchAPIAuth, POST, withJsonBody, withStatusCode } from '@/util/fetch.util';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { COOKIE_AUTH_TOKEN, COOKIE_REFRESH_TOKEN } from '@/data/constant';

export async function MyPageDeleteAccount(req: { password: string }) {
  const ret = await fetchAPIAuth('api/mypage/delete-profile', await POST().then(withJsonBody(req)));

  const json = await ret.json().then(withStatusCode(ret.status));

  if (json.status === 'SUCCESS') {
    (await cookies()).delete(COOKIE_AUTH_TOKEN);
    (await cookies()).delete(COOKIE_REFRESH_TOKEN);
    revalidatePath('/', 'layout');
  }

  return json;
}
