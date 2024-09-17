import { build } from '@/lib/api/builder';
import withTokenInstance from './instances.ts/withTokenInstance';

export const apiSignup = build<SignupRequest, string>(withTokenInstance, 'POST', '/api/signup');
export const apiDuplicateName = build<DupNameRequest, unknown>(withTokenInstance, 'GET', '/api/signup/check-username');
export const apiLogin = build<LoginRequest, { accessToken: JWT; refreshToken: JWT | null }>(
  withTokenInstance,
  'POST',
  '/api/login',
  {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  },
);
export const apiLogout = build<Record<string, never>, null>(withTokenInstance, 'POST', '/api/logout');
export const apiSendEmail = build<ReqeustSendCode, unknown>(withTokenInstance, 'GET', '/api/signup/send-email');
export const apiCheckEmail = build<CheckEmailReqeust, unknown>(withTokenInstance, 'GET', '/api/signup/check-email');
export const apiResetPassword = build<ResetPwReq, unknown>(withTokenInstance, 'POST', '/api/login/reset-password');
export const apiCheckLogin = build<Record<string, never>, SimpleCheckLogin>(
  withTokenInstance,
  'GET',
  '/api/check-login',
);
