import { getMyPageBookmarksCount } from '../../../api/mypage.api';
import BookmarksView from './components/MyBookmarksView';

export default async function MyPageBookmarksPage() {
  const totalCount = await getMyPageBookmarksCount();

  return <BookmarksView totalCount={totalCount.data} />;
}
