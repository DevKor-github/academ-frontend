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
export const apiLogin = build<LoginRequest, { accessToken: JWT; refreshToken: JWT | null }>('POST', '/api/login', {
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});
export const apiLogout = build<{}, null>('POST', '/api/logout');

export interface ReqeustWithEmail {
  email: string;
}

// build가 맞음
export const apiSendEmail = build<ReqeustWithEmail, unknown>('GET', '/api/signup/send-email');

export interface CheckEmailReqeust {
  email: string;
  code: string;
}

// build가 맞음
export const apiCheckEmail = build<CheckEmailReqeust, unknown>('GET', '/api/signup/check-email');

// build가 맞음
export const apiResetPassword = build<ReqeustWithEmail, unknown>('GET', '/api/login/reset-password');
export const apiCheckLogin = build<{}, UserProfile>('GET', '/api/check-login');
export const useApiCheckLogin = createApiHook(apiCheckLogin);
