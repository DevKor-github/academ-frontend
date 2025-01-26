interface JWTDecoded {
  profile_id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface MembershipData {
  item: string;
  day: number;
  price: number;
  iconLevel: 1 | 2 | 3;
}

interface MyPageBasicInfo {
  profile_id: number;
  email: string;
  username: string;
  student_id: string;
  degree: 'MASTER' | 'DOCTOR';
  semester: number;
  department: string;
  point: number;
  access_expiration_date: string;
  created_at: string;
  role: string;
}

type UserProfile = MyPageBasicInfo;
