import { getMyPageBasics } from '@/app/api/mypage.api';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
interface Props {
  basic: ReactNode;
  membership: ReactNode;
  bookmarks: ReactNode;
  comments: ReactNode;
}
export default async function Layout({ basic, membership, bookmarks, comments }: Props) {
  const mypagebasics = await getMyPageBasics();

  if (mypagebasics.status !== 'SUCCESS') {
    redirect('/login');
  }

  return (
    <div className="flex flex-col w-full h-full">
      {basic}
      {membership}
      {bookmarks}
      {comments}
    </div>
  );
}
