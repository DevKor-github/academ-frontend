'use client';

import { useSessionId } from "@/context/SessionIdContext";
import { useApiMyPageBasics } from "@/lib/api/mypage";

import ManageMembership from "../static/ManageMembership";
import UserDataOverview from "../static/UserDataOverview";


function NoSessionIdFallback() {
  return <div>이 기능을 사용하려면 로그인해야 합니다.</div>;
}

export default function ProfileOverviewWithMemberShip() {
  const [jwt] = useSessionId();

  const { loading, response : myprofile } = useApiMyPageBasics({}, { token: jwt?.accessToken });

  if (jwt === null) {
    return <NoSessionIdFallback />;
  }

  if (loading) {
    return <div />;
  }

  if (myprofile.status !== 'SUCCESS') {
    return <div />;
  }

  return (<>
    <UserDataOverview userprofile={myprofile.data} />
    <ManageMembership profile={myprofile.data} />
  </>
  );
}
