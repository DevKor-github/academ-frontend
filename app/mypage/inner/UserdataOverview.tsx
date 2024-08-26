'use client';

import Link from 'next/link';

import DepartIcon from '@/components/composite/departIcon';

export default function UserDataOverview({ userprofile }: { userprofile: UserProfile }) {
  let degreePrint =
    userprofile.degree === 'MASTER' ? '석사과정' : userprofile.degree === 'DOCTOR' ? '박사과정' : '?과정';

  return (
    <div className="p-8 text-xl flex flex-row flex-wrap gap-16 w-full justify-start items-start">
      <div
        className="block bg-white rounded-2xl p-4 border border-light-back-4"
        style={{ width: '192px', height: '128px' }}
      >
        <DepartIcon code="???" />
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
        <button className="border border-primary-400 rounded-full text-sm pt-1 pb-1 pl-4 pr-4 text-primary-400">
          수정하기
        </button>
      </Link>
    </div>
  );
}
