'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import ManageMembership from './static/MyProfileMemberships';
import UserDataOverview from './static/MyProfileBasics';
import { apiMyPageBasics } from '@/lib/api/calls/mypage';

import TempAlert from './static/TempAlert';
import { CloseIcon } from '@/lib/icons';

import { use } from 'react';
import BookmarksView from './dynamic/BookmarksView';
import MyCommentsView from './dynamic/MyCommentsView';
import { LoginRequiredError } from '@/lib/api/errors';

export default function ProfileOverviewWithMemberShip() {
  const router = useRouter();
  const params = useSearchParams();

  const pwchanged = params?.get('pwchanged') !== null;
  const profilechanged = params?.get('profilechanged') !== null;

  const myprofile = use(apiMyPageBasics({}));

  if (myprofile.status !== 'SUCCESS') {
    throw new LoginRequiredError('Login Required to see this page');
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
