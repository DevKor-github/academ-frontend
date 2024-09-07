'use client';

import { useSessionId } from '@/context/SessionIdContext';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import ManageMembership from '../static/ManageMembership';
import UserDataOverview from '../static/UserDataOverview';
import { apiMyPageBasics } from '@/lib/api/mypage';
import { useApi } from '@/lib/api/builder';
import TempAlert from '../static/TempAlert';
import { CloseIcon } from '@/icons';

function NoSessionIdFallback() {
  return <div className="animate-fade p-8 text-center w-full text-2xl">이 기능을 사용하려면 로그인해야 합니다.</div>;
}

export default function ProfileOverviewWithMemberShip() {
  const router = useRouter();
  const params = useSearchParams();

  const pwchanged = params?.get('pwchanged') !== null;
  const profilechanged = params?.get('profilechanged') !== null;

  const [jwt] = useSessionId();

  const { loading, response: myprofile } = useApi(apiMyPageBasics, {}, { token: jwt?.accessToken });

  if (jwt === null) {
    return <NoSessionIdFallback />;
  }

  if (loading) {
    return <div />;
  }

  if (myprofile.status !== 'SUCCESS') {
    return <div />;
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
    <>
      {pwchanged ? <TempAlert closeButton={RemoveAlert}>비밀번호가 성공적으로 변경되었습니다.</TempAlert> : <></>}
      {profilechanged ? <TempAlert closeButton={RemoveAlert}>프로필을 성공적으로 업데이트했습니다.</TempAlert> : <></>}
      <UserDataOverview userprofile={myprofile.data} />
      <ManageMembership profile={myprofile.data} />
    </>
  );
}
