export type JWT = string;

export interface UserProfile {
  profile_id: number;
  email: string;
  username: string;
  student_id: string;
  degree: string;
  semester: number;
  department: string;
  point: string;
  created_at: string;
  role: string;
}

export interface JWTDecoded {
  memberId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
