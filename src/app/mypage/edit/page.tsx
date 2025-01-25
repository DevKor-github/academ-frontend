import { getMyPageBasics } from '@/app/api/mypage.api';
import MyPageEditBasicWithProfile from './form';
import ErrorTemplate from '@/components/template';

export default async function MyPageEditBasic() {
  const profile = await getMyPageBasics();

  if (profile.status === 'SUCCESS') {
    return <MyPageEditBasicWithProfile profile={profile.data} />;
  }

  return <ErrorTemplate title="?" subtitle="오류가 발생했습니다." />;
}
