import { getMyPageCommentsCount } from '../../../api/mypage.api';
import MyCommentsView from './components/MyCommentsView';

export default async function MyPageCommentsPage() {
  const totalCount = await getMyPageCommentsCount();

  return <MyCommentsView totalCount={totalCount.data} />;
}
