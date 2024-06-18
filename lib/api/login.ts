
import { build } from '@/lib/api/builder/backend';
import { UserProfile } from '../models/user';

export interface SignupRequest {
  email: string,
  password: string,
  username: string,
  student_id: string,
  degree: 'MASTER' | 'DOCTOR',
  semester: number,
  department: string,
  code: string,
}

export const apiSignup = build<SignupRequest, string>("POST", "/api/signup", [400, 404, 401]);

export interface LoginRequest {
  email: string,
  password: string,
  "remember-me": boolean,
}

export const apiLogin = build<LoginRequest, null>("POST", "/api/login", [400, 404, 401], {
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
});
export const apiLogout = build<{}, null>("POST", "/api/logout", [400, 404, 401]);

export interface ReqeustWithEmail {
  email: string,
}

export const apiSendEmail = build<ReqeustWithEmail, unknown>("GET", "/api/signup/send-email", [400, 404, 401]);

export interface CheckEmailReqeust {
  email: string,
  code: string,
}

export const apiCheckEmail = build<CheckEmailReqeust, unknown>("GET", "/api/signup/check-email", [400, 404, 401]);
export const apiResetPassword = build<ReqeustWithEmail, unknown>("GET", "/api/login/reset-password", [400, 404, 401]);
export const apiCheckLogin = build<{}, UserProfile>("GET", "/api/login/check-login", [400, 404, 401]);



