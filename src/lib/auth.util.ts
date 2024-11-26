import { cookies } from 'next/headers';
import { COOKIE_AUTH_TOKEN, COOKIE_REFRESH_TOKEN } from './directive.server';

export async function accessToken() {
  return (await cookies()).get(COOKIE_AUTH_TOKEN)?.value;
}

export async function refreshToken() {
  return (await cookies()).get(COOKIE_REFRESH_TOKEN)?.value;
}
