'use client';

import { SessionIdContext } from '@/context/SessionIdContext';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import ManageMembership from './static/MyProfileMemberships';
import UserDataOverview from './static/MyProfileBasics';
import { apiMyPageBasics } from '@/lib/api/mypage';

import TempAlert from './static/TempAlert';
import { CloseIcon } from '@/icons';

import { use } from 'react';
import BookmarksView from './dynamic/BookmarksView';
import MyCommentsView from './dynamic/MyCommentsView';

function NoSessionIdFallback() {
  return <div className="animate-fade p-8 text-center w-full text-2xl">이 기능을 사용하려면 로그인해야 합니다.</div>;
}

export default function ProfileOverviewWithMemberShip() {
  const router = useRouter();
  const params = useSearchParams();

  const pwchanged = params?.get('pwchanged') !== null;
  const profilechanged = params?.get('profilechanged') !== null;

  const [jwt] = use(SessionIdContext);
  const myprofile = use(apiMyPageBasics({}, { token: jwt?.accessToken }));

  if (jwt === null) {
    return <NoSessionIdFallback />;
  }

  if (myprofile.status !== 'SUCCESS') {
    return <div>먼가오류가 -.-;;</div>;
  }

  const RemoveAlert = (
    <button
      onClick={() => {
        router.replace('/mypage', {});
      }}
    >
      <CloseIcon />
    </button>
  );

  return (
    <div className="flex flex-col w-full h-full">
      {pwchanged ? <TempAlert closeButton={RemoveAlert}>비밀번호가 성공적으로 변경되었습니다.</TempAlert> : <></>}
      {profilechanged ? <TempAlert closeButton={RemoveAlert}>프로필을 성공적으로 업데이트했습니다.</TempAlert> : <></>}
      <UserDataOverview userprofile={myprofile.data} />
      <ManageMembership access_expiration_date={myprofile.data.access_expiration_date} />
      <BookmarksView />
      <MyCommentsView />
    </div>
  );
}
