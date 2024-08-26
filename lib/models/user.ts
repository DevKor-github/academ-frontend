interface SimpleCheckLogin {
  profile_id: number;
  email: string;
  role: string;
}


interface UserProfile {
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

interface JWTDecoded {
  memberId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}


interface SignupRequest {
  email: string;
  password: string;
  username: string;
  student_id: string;
  degree: 'MASTER' | 'DOCTOR';
  semester: number;
  department: string;
  code: string;
}

interface DupNameRequest {
  username: string;
}

interface LoginRequest {
  email: string;
  password: string;
  'remember-me': boolean;
}

interface ReqeustWithEmail {
  email: string;
}

interface CheckEmailReqeust {
  email: string;
  code: string;
}