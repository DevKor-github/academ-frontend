'use client';

import { build } from '@/lib/api-client/builder';

export const apiSignup = build<SignupRequest, string>('post', 'api/signup');
export const apiDuplicateName = build<DupNameRequest, unknown>('get', 'api/signup/check-username');
export const apiLogin = build<LoginRequest, { accessToken: JWT; refreshToken: JWT | null }>(
  'post-form-urlencoded',
  'api/login',
);
export const apiLogout = build<Record<string, never>, null>('post', 'api/logout');
export const apiSendEmail = build<ReqeustSendCode, unknown>('get', 'api/signup/send-email');
export const apiCheckEmail = build<CheckEmailReqeust, unknown>('get', 'api/signup/check-email');
export const apiResetPassword = build<ResetPwReq, unknown>('post', 'api/login/reset-password');
export const apiCheckLogin = build<Record<string, never>, SimpleCheckLogin>('get', 'api/check-login');
