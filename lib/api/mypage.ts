import { build } from './builder';

export interface UpdateProfileReq {
  username: string;
  student_id: string;
  degree: 'MASTER' | 'DOCTOR';
  semester: number;
  department: string;
}

export const apiProfileUpdateBasic = build<UpdateProfileReq, null>('POST', '/api/mypage/update-basic');

export interface UpdatePWReq {
  password: string;
}
export interface UpdatePWExtended extends UpdatePWReq {
  // old_password: string;
  password_check: string;
}

export const apiProfileUpdatePW = build<UpdatePWReq, null>('POST', '/api/mypage/update-password');
