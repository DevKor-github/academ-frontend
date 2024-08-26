export interface SimpleCheckLogin {
  profile_id: number;
  email: string;
  role: string;
}


export interface UserProfile {
  profile_id: number;
  email: string;
  username: string;
  student_id: string;
  degree: 'MASTER' | 'DOCTOR';
  semester: number;
  department: string;
  point: string;
  created_at: string;
  access_expiration_date: string;
  role: string;
}

export interface JWTDecoded {
  memberId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
