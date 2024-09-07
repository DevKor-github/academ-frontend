import dynamic from 'next/dynamic';
import MyPageLoading from './loading';

const ProfileOverviewWithMemberShip = dynamic(() => import('./dynamic/ProfileOverviewWithMemberShip'), {
  ssr: false,
  loading: MyPageLoading,
});
const BookmarksView = dynamic(() => import('./dynamic/BookmarksView'), { ssr: false, loading: MyPageLoading });
const MyCommentsView = dynamic(() => import('./dynamic/MyCommentsView'), { ssr: false, loading: MyPageLoading });

export default function MyPage() {
  return (
    <main className="w-full flex-grow">
      <ProfileOverviewWithMemberShip />
      <BookmarksView />
      <MyCommentsView />
    </main>
  );
}
