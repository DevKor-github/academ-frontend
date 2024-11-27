'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { IS_DEBUG } from '@/data/constant';
import { COOKIE_AUTH_TOKEN, COOKIE_REFRESH_TOKEN } from '@/data/constant';
import { LoginFormState } from './page';

export async function handleLoginServer(currentState: LoginFormState, fd: FormData) {
  try {
    console.log('handleLoginServer', currentState, fd);

    const body = new URLSearchParams({
      email: fd.get('email') as string,
      password: fd.get('password') as string,
      'remember-me': String(fd.get('remember-me') === 'on') as string,
    });

    console.log('body', body);

    const result = await fetch(new URL('/api/login', process.env.NEXT_PUBLIC_BACKEND_API_URL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    const json = await result.json();

    if (json.status === 'SUCCESS') {
      console.log('login success');
    } else {
      return { error: json.message };
    }

    console.log('json', json);

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
  } catch (e) {
    console.log('error', JSON.stringify(e), e);
    return { error: '알 수 없는 오류로 실패했습니다. 잠시 후 다시 시도해주세요.' };
  }
  redirect('/');
}
