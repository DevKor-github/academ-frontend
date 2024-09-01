'use client';

import { useSessionId } from "@/context/SessionIdContext";

import ManageMembership from "../static/ManageMembership";
import UserDataOverview from "../static/UserDataOverview";
import { apiMyPageBasics } from "@/lib/api/mypage";
import { useApi } from "@/lib/api/builder";

function NoSessionIdFallback() {
  return <div>이 기능을 사용하려면 로그인해야 합니다.</div>;
}

export default function ProfileOverviewWithMemberShip() {
  const [jwt] = useSessionId();

  const { loading, response : myprofile } = useApi(apiMyPageBasics, {}, { token: jwt?.accessToken });

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
