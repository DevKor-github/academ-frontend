'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { IS_DEBUG } from '@/data/constant';
import { COOKIE_AUTH_TOKEN, COOKIE_REFRESH_TOKEN } from '@/data/constant';
import type { LoginRequest } from '@/types/user.types';

export async function handleLoginServer(input: LoginRequest) {
  try {
    const body = new URLSearchParams({ ...input, 'remember-me': String(input['remember-me']) }).toString();

    console.log('body', body);

    const result = await fetch(new URL('/api/login', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    const json = await result.json();

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_AUTH_TOKEN, json.data?.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: !IS_DEBUG,
    });

    cookieStore.set(COOKIE_REFRESH_TOKEN, json.data?.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: !IS_DEBUG,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    revalidatePath('/', 'layout');
    revalidatePath('/mypage', 'layout');
    return json;
  } catch (e) {
    console.log('error', JSON.stringify(e), e);
    return { error: '알 수 없는 오류로 실패했습니다. 잠시 후 다시 시도해주세요.' };
  }
}
