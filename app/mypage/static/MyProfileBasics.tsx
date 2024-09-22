import Link from 'next/link';

import DepartIcon from '@/component/composite/departIcon';
import { SkeletonSlow } from '@/component/composite/skeleton';

function MyProfileBasicsUnsafe({
  degree,
  username,
  department,
  semester,
  point,
}: ReplaceValues<Pick<UserProfile, 'username' | 'department' | 'semester' | 'degree' | 'point'>, React.ReactNode>) {
  return (
    <div className="p-8 text-xl flex flex-row flex-wrap gap-16 w-full justify-start items-start">
      <div
        className="flex justify-center items-center text-7xl bg-white rounded-2xl p-4 border border-base-28"
        style={{ width: '192px', height: '128px' }}
      >
        <DepartIcon code="???" />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-bold text-3xl">{username}</span> 님
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-8">
            <span className="font-bold">{department}</span>
            <span>{degree}</span>
            <span className="font-bold">{semester}학기</span>
          </div>
          <div>
            <span className="font-bold">잔여 포인트</span> {point}
          </div>
        </div>
      </div>
      <Link href="/mypage/edit" className="self-end ml-auto">
        <button className="border border-primary-400 rounded-full text-sm pt-1 pb-1 pl-4 pr-4 text-primary-400">
          수정하기
        </button>
      </Link>
    </div>
  );
}

export function MyProfileBasicsLoading() {
  return (
    <MyProfileBasicsUnsafe
      username={<SkeletonSlow placeholder="???" />}
      department={<SkeletonSlow placeholder="???" />}
      degree={<SkeletonSlow placeholder="???" />}
      semester={<SkeletonSlow placeholder="???" />}
      point={<SkeletonSlow placeholder="???" />}
    />
  );
}

export default function MyProfileBasics({ userprofile }: { userprofile: UserProfile }) {
  const degreePrint =
    userprofile.degree === 'MASTER' ? '석사과정' : userprofile.degree === 'DOCTOR' ? '박사과정' : '?과정';

  return (
    <MyProfileBasicsUnsafe
      username={userprofile.username}
      department={userprofile.department}
      degree={degreePrint}
      semester={userprofile.semester}
      point={userprofile.point}
    />
  );
}
