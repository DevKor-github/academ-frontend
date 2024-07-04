import { build, createApiHook } from '@/lib/api/builder';
import { JWT, UserProfile } from '../models/user';

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  student_id: string;
  degree: 'MASTER' | 'DOCTOR';
  semester: number;
  department: string;
  code: string;
}

export const apiSignup = build<SignupRequest, string>('POST', '/api/signup', [400, 404, 401]);

export interface LoginRequest {
  email: string;
  password: string;
  'remember-me': boolean;
}

// build가 맞음
export const apiLogin = build<LoginRequest, { accessToken: JWT; refreshToken: JWT | null }>(
  'POST',
  '/api/login',
  [400, 404, 401],
  {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  },
);
export const apiLogout = build<{}, null>('POST', '/api/logout', [400, 404, 401]);

export interface ReqeustWithEmail {
  email: string;
}

// build가 맞음
export const apiSendEmail = build<ReqeustWithEmail, unknown>('GET', '/api/signup/send-email', [400, 404, 401]);

export interface CheckEmailReqeust {
  email: string;
  code: string;
}

// build가 맞음
export const apiCheckEmail = build<CheckEmailReqeust, unknown>('GET', '/api/signup/check-email', [400, 404, 401]);

// build가 맞음
export const apiResetPassword = build<ReqeustWithEmail, unknown>('GET', '/api/login/reset-password', [400, 404, 401]);
export const apiCheckLogin = build<{}, UserProfile>('GET', '/api/check-login', [400, 404, 401]);
export const useApiCheckLogin = createApiHook(apiCheckLogin);
