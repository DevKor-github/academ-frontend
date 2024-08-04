'use client';

import Link from 'next/link';

import { UserProfile } from '@/lib/models/user';

export default function UserDataOverview({ userprofile }: { userprofile: UserProfile }) {
  let degreePrint =
    userprofile.degree === 'MASTER' ? '석사과정' : userprofile.degree === 'DOCTOR' ? '박사과정' : '?과정';

  return (
    <div className="p-8 text-xl flex flex-row gap-16 w-full justify-start items-start">
      <div className="block bg-neutral-500 rounded-2xl" style={{ width: '192px', height: '128px' }}>
        로고이미지
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-bold text-3xl">{userprofile.username}</span> 님
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-8">
            <span className="font-bold">{userprofile.department}</span>
            <span>{degreePrint}</span>
            <span className="font-bold">{userprofile.semester}학기</span>
          </div>
          <div>
            <span className="font-bold">잔여 포인트</span> {userprofile.point}
          </div>
        </div>
      </div>
      <Link href="/mypage/edit" className="self-end ml-auto">
        수정하기
      </Link>
    </div>
  );
}
