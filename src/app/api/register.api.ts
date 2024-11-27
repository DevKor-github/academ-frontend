'use server';

import { accessToken } from '@/lib/auth.util';

export async function duplicateName(input: DupNameRequest) {
  const url = new URL('api/signup/check-username', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  Object.entries(input).forEach(([k, v]) => url.searchParams.append(k, v.toString()));
  return await fetch(url, {
    method: 'GET',
  }).then((v) => v.json() as Promise<ApiResponse<unknown>>);
}

export async function signUp(input: SignupRequest) {
  const url = new URL('api/signup', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json() as Promise<ApiResponse<string>>);
}

export async function checkEmail(input: CheckEmailReqeust) {
  const url = new URL('api/signup/check-email', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  Object.entries(input).forEach(([k, v]) => url.searchParams.append(k, v.toString()));
  return await fetch(url, {
    method: 'GET',
  }).then((v) => v.json() as Promise<ApiResponse<unknown>>);
}

export async function sendEmail(input: ReqeustSendCode) {
  const url = new URL('api/signup/send-email', process.env.NEXT_PUBLIC_BACKEND_API_URL);
  Object.entries(input).forEach(([k, v]) => url.searchParams.append(k, v.toString()));
  return await fetch(url, {
    method: 'GET',
  }).then((v) => v.json() as Promise<ApiResponse<unknown>>);
}

// export const apiCheckLogin = build<Record<string, never>, SimpleCheckLogin>('get', 'api/check-login');

export async function resetPW(input: ResetPwReq) {
  const token = await accessToken();
  const url = new URL('api/login/reset-password', process.env.NEXT_PUBLIC_BACKEND_API_URL);

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json() as Promise<ApiResponse<unknown>>);
}
