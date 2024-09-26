'use client';

import { build } from '@/lib/api-client/builder';
import basicInstance from '../instances/basic';
import doRefresh from '../instances/\bwithRefresh';

export const apiSignup = build<SignupRequest, string>(basicInstance, 'POST', '/api/signup');
export const apiDuplicateName = build<DupNameRequest, unknown>(basicInstance, 'GET', '/api/signup/check-username');
export const apiLogin = build<LoginRequest, { accessToken: JWT; refreshToken: JWT | null }>(
  basicInstance,
  'POST',
  '/api/login',
  {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  },
);
export const apiLogout = build<Record<string, never>, null>(doRefresh, 'POST', '/api/logout');
export const apiSendEmail = build<ReqeustSendCode, unknown>(basicInstance, 'GET', '/api/signup/send-email');
export const apiCheckEmail = build<CheckEmailReqeust, unknown>(basicInstance, 'GET', '/api/signup/check-email');
export const apiResetPassword = build<ResetPwReq, unknown>(doRefresh, 'POST', '/api/login/reset-password');
export const apiCheckLogin = build<Record<string, never>, SimpleCheckLogin>(doRefresh, 'GET', '/api/check-login');
