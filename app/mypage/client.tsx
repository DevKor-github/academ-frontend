'use client';

import { useSessionId } from '../../context/SessionIdContext';

import { useApiMyPageBasics } from '@/lib/api/mypage';

import MyCommentsView from './inner/MyCommentsView';
import BookmarksView from './inner/BookmarksView';
import ManageMembership from './inner/ManageMembership';
import UserDataOverview from './inner/UserdataOverview';

import ErrorTemplate from '@/lib/template';

function NoSessionIdFallback() {
  return <div>이 기능을 사용하려면 로그인해야 합니다.</div>;
}


export default function MyPage() {
  const [jwt] = useSessionId();

  const { loading, response : myprofile } = useApiMyPageBasics({}, { token: jwt?.accessToken });

  if (jwt === null) {
    return <NoSessionIdFallback />;
  }

  if (loading) {
    return <div>로딩중</div>;
  }

  if (myprofile.status === 'SUCCESS') {
    return (
      <main className="w-full flex-grow">
        <UserDataOverview userprofile={myprofile.data} />
        <ManageMembership profile={myprofile.data} />
        <BookmarksView />
        <MyCommentsView />
      </main>
    );
  } else {
    return <ErrorTemplate title={(myprofile.statusCode).toString()} subtitle={'오류가 발생했습니다. 다음 정보를 참고하세요: ' + myprofile.message} />;
  }
}