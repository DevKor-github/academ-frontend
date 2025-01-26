import z from 'zod';

export const UpdatePWRequestSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
});

export type UpdatePWRequest = z.infer<typeof UpdatePWRequestSchema>;

export interface ReqeustWithEmail {
  email: string;
}

export interface ResetPwReq {
  email: string;
  code: string;
}

export interface ReqeustSendCode {
  email: string;
  purpose: 'SIGN_UP' | 'RESET_PASSWORD';
}

export type UpdateProfileReq = Pick<MyPageBasicInfo, 'username' | 'student_id' | 'degree' | 'semester' | 'department'>;

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

export interface LoginRequest {
  email: string;
  password: string;
  'remember-me': boolean;
}

export interface DupNameRequest {
  username: string;
}

export interface CheckEmailReqeust {
  email: string;
  code: string;
}
