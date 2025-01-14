'use server';

import { cookies } from 'next/headers';
import { COOKIE_AUTH_TOKEN } from '@/data/constant';

export const getAccessToken = async () => {
  return (await cookies()).get(COOKIE_AUTH_TOKEN)?.value;
};

export const getRefreshToken = async () => {
  return (await cookies()).get(COOKIE_AUTH_TOKEN)?.value;
};
