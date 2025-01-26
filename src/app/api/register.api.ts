import type { CheckEmailReqeust, DupNameRequest, ReqeustSendCode, ResetPwReq, SignupRequest } from '@/types/user.types';
import { fetchAPI, fetchAPIAuth, POST, searchParamString, withJsonBody, withStatusCode } from '@/util/fetch.util';

export async function duplicateName(input: DupNameRequest) {
  return await fetchAPI(`api/signup/check-username${searchParamString({ ...input }, '?')}`, {
    method: 'GET',
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<unknown>>);
}

export async function signUp(input: SignupRequest) {
  return await fetchAPI('api/signup', await POST().then(withJsonBody(input))).then(
    (v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<string>>,
  );
}

export async function checkEmail(input: CheckEmailReqeust) {
  return await fetchAPI(`api/signup/check-email${searchParamString({ ...input }, '?')}`, {
    method: 'GET',
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<unknown>>);
}

export async function sendEmail(input: ReqeustSendCode) {
  return await fetchAPI(`api/signup/send-email${searchParamString({ ...input }, '?')}`, {
    method: 'GET',
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<unknown>>);
}

// export const apiCheckLogin = build<Record<string, never>, SimpleCheckLogin>('get', 'api/check-login');

export async function resetPW(input: ResetPwReq) {
  return fetchAPIAuth('api/login/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((v) => v.json().then(withStatusCode(v.status)) as Promise<ApiResponse<unknown>>);
}
