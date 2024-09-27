'use client';

import { build } from '@/lib/api-client/builder';

export const apiSignup = build<SignupRequest, string>('POST', '/api/signup');
export const apiDuplicateName = build<DupNameRequest, unknown>('GET', '/api/signup/check-username');
export const apiLogin = build<LoginRequest, { accessToken: JWT; refreshToken: JWT | null }>('POST', '/api/login', {
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});
export const apiLogout = build<Record<string, never>, null>('POST', '/api/logout');
export const apiSendEmail = build<ReqeustSendCode, unknown>('GET', '/api/signup/send-email');
export const apiCheckEmail = build<CheckEmailReqeust, unknown>('GET', '/api/signup/check-email');
export const apiResetPassword = build<ResetPwReq, unknown>('POST', '/api/login/reset-password');
export const apiCheckLogin = build<Record<string, never>, SimpleCheckLogin>('GET', '/api/check-login');
