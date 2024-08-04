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
  // oldPassword: string;
  password: string;
}

export const apiProfileUpdatePW = build<UpdatePWReq, null>('POST', '/api/mypage/update-password');
