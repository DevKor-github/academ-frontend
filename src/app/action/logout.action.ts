'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { COOKIE_AUTH_TOKEN, COOKIE_REFRESH_TOKEN } from '@/data/constant';

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_AUTH_TOKEN);
  cookieStore.delete(COOKIE_REFRESH_TOKEN);

  revalidatePath('/', 'layout');
  redirect('/');
}
