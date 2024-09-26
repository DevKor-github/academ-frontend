'use client';

import { build } from '@/lib/api-client/builder';
import basicInstance from '../instances/basic';
import withRefreshResolved from '../instances/withRefreshResolved';

export const apiSignup = build<SignupRequest, string>(basicInstance, 'POST', '/api/signup');
export const apiDuplicateName = build<DupNameRequest, unknown>(
  withRefreshResolved,
  'GET',
  '/api/signup/check-username',
);
export const apiLogin = build<LoginRequest, { accessToken: JWT; refreshToken: JWT | null }>(
  withRefreshResolved,
  'POST',
  '/api/login',
  {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  },
);
export const apiLogout = build<Record<string, never>, null>(withRefreshResolved, 'POST', '/api/logout');
export const apiSendEmail = build<ReqeustSendCode, unknown>(basicInstance, 'GET', '/api/signup/send-email');
export const apiCheckEmail = build<CheckEmailReqeust, unknown>(basicInstance, 'GET', '/api/signup/check-email');
export const apiResetPassword = build<ResetPwReq, unknown>(withRefreshResolved, 'POST', '/api/login/reset-password');
export const apiCheckLogin = build<Record<string, never>, SimpleCheckLogin>(
  withRefreshResolved,
  'GET',
  '/api/check-login',
);
