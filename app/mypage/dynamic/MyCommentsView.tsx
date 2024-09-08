'use client';

import Button from '@/components/basic/button';
import { DownIcon } from '@/icons';
import { apiMyPageComments } from '@/lib/api/mypage';
import { usePagination } from '@/lib/hooks/pagination';
import { useEffect } from 'react';
import { SessionIdContext } from '@/context/SessionIdContext';
import CommentsView from '@/app/lecture/[id]/components/comments';
import { use } from 'react';

export default function MyCommentsView() {
  const [jwt] = use(SessionIdContext);
  const [pages, fetchThis] = usePagination(apiMyPageComments);

  function fetchNext() {
    fetchThis({ page: pages.page + 1 }, { token: jwt?.accessToken });
  }

  useEffect(fetchNext, []);

  if (jwt === null) {
    // silent kill
    return <div />;
  }

  if (pages.totalLoadingState === 'bot') {
    return <div />;
  }

  const nextButton = pages.eoc ? (
    <div></div>
  ) : (
    <div className="w-full pt-6 flex flex-col justify-center items-center">
      {pages.failwith !== null && <div>오류!!</div>}
      <Button onClick={fetchNext}>
        <DownIcon />
      </Button>
    </div>
  );

  return (
    <>
      <CommentsView comments={pages.data} mypage={true} />
      {nextButton}
    </>
  );
}
