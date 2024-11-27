import { cookies } from 'next/headers';
import { COOKIE_AUTH_TOKEN, COOKIE_REFRESH_TOKEN } from '@/data/constant';

export async function accessToken() {
  return (await cookies()).get(COOKIE_AUTH_TOKEN)?.value;
}

export async function refreshToken() {
  return (await cookies()).get(COOKIE_REFRESH_TOKEN)?.value;
}

export async function accessTokenDecoded() {
  const token = await accessToken();

  if (token === undefined) {
    return undefined;
  }

  return decode<JWTDecoded>(token);
}

function decode<T>(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload) as T;
}
