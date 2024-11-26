'use client';

import { useApi } from '@/lib/hooks/api';
import { useRouter, useSearchParams } from 'next/navigation';

import ManageMembership from './static/MyProfileMemberships';
import MyProfileBasics from './static/MyProfileBasics';

import { apiMyPageBasics } from '@/lib/api-client/calls/mypage';
import { CloseIcon } from '@/components/icon';

import TempAlert from './static/TempAlert';

import BookmarksView from './part/MyBookmarksView';
import MyCommentsView from './part/MyCommentsView';

import { LoginRequiredView } from '@/components/composite/PermissionView';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';

import MyPageLoading from './loading';

export default function ProfileOverviewWithMemberShip() {
  const [{ instances }] = useAuthTokens();
  const router = useRouter();
  const params = useSearchParams();

  const pwchanged = params?.get('pwchanged') !== null;
  const profilechanged = params?.get('profilechanged') !== null;

  const { loading, response: myprofile } = useApi(instances.doRefresh, apiMyPageBasics, {});

  if (loading) {
    return <MyPageLoading />;
  }

  if (myprofile.status !== 'SUCCESS') {
    return <LoginRequiredView />;
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
      <MyProfileBasics userprofile={myprofile.data} />
      <ManageMembership access_expiration_date={myprofile.data.access_expiration_date} />
      <BookmarksView />
      <MyCommentsView />
    </div>
  );
}
