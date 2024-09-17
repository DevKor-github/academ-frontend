'use client';

import Button from '@/components/basic/button';
import { DownIcon } from '@/icons';
import { apiMyPageComments } from '@/lib/api/calls/mypage';
import { usePagination } from '@/lib/hooks/pagination';
import { useEffect } from 'react';
import CommentsView from '@/app/lecture/[id]/components/comments';

export default function MyCommentsView() {
  const [pages, fetchThis] = usePagination(apiMyPageComments);

  function fetchNext() {
    fetchThis({ page: pages.page + 1 });
  }

  useEffect(fetchNext, []);

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
