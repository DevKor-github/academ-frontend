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

type UpdateProfileReq = Pick<MyPageBasicInfo, 'username' | 'student_id' | 'degree' | 'semester' | 'department'>;

interface UpdatePWReq {
  password: string;
}

interface UpdatePWExtended extends UpdatePWReq {
  // old_password: string;
  password_check: string;
}

interface MembershipData {
  item: string;
  day: number;
  price: number;
  iconLevel: 1 | 2 | 3;
}
