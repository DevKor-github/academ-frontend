'use client';

import { useState } from 'react';

import { HStack, VStack } from '@/components/basic/stack';

import { apiMyPageBookmarksCount } from '@/lib/api-client/calls/mypage';
import Button from '@/components/basic/button';
import { BookmarkIcon, RightIcon } from '@/components/icon';
import { ELEM_PER_PAGE } from '@/lib/directive';
// import dynamic from 'next/dynamic';

import { memo } from 'react';
import CoursePreview from '@/components/view/CoursePreview';
import { apiMyPageBookmarks } from '@/lib/api-client/calls/mypage';
import { CourseLoadingItems } from '@/app/lecture/aux';
import { useApi } from '@/lib/hooks/api';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';

function Box({ children }: React.PropsWithChildren) {
  return (
    <HStack className="pl-2 pr-2 md:pl-8 md:pr-8 pt-24 h-full transition-all light:bg-base-31 dark:bg-base-2">
      <VStack className="items-center justify-start gap-2">
        <span className="text-2xl">강의 책갈피</span>
      </VStack>
      <div className="overflow-scroll w-full">
        <div className="flex flex-row w-fit gap-4 py-8">{children}</div>
      </div>
    </HStack>
  );
}

const ApiMyPageBookmarks = memo(
  function ApiMyPageBookmarks({ page }: ReqPaginated) {
    const [{ instances }] = useAuthTokens();
    const { loading, response: bms } = useApi(instances.doRefresh, apiMyPageBookmarks, { page });

    if (loading) {
      return <CourseLoadingItems />;
    }

    if (bms.status !== 'SUCCESS') {
      return <div>오류 발생</div>;
    }

    return bms.data.flatMap((v) => <CoursePreview key={v.course_id} course={v} />);
  },
  (prev, next) => prev.page === next.page,
);

export default function BookmarksView() {
  const [{ instances }] = useAuthTokens();

  const { loading, response: totalCount } = useApi(instances.doRefresh, apiMyPageBookmarksCount, {});
  const [page, setPage] = useState<number>(1);

  if (loading) {
    return <Box>...</Box>;
  }
  const totalPage = Math.ceil(totalCount.data / ELEM_PER_PAGE);
  const pages = new Array(page).fill(null).map((_, i) => i + 1);

  if (totalCount.status !== 'SUCCESS') {
    return <div>오류</div>;
  }

  if (totalCount.data <= 0) {
    return (
      <Box>
        <div className="self-center bg-base-32 p-8 rounded-xl border border-base-28">
          표시할 강의가 없습니다. 강의 페이지에서{' '}
          <span className="text-base-10">
            <BookmarkIcon />
          </span>
          을 눌러 강의를 책갈피에 저장해보세요!
        </div>
      </Box>
    );
  }

  const nextButton =
    page >= totalPage ? (
      <div />
    ) : (
      <Button kind="blank" onClick={() => setPage((n) => n + 1)}>
        <RightIcon />
      </Button>
    );

  return (
    <Box>
      {pages.flatMap((v) => (
        <ApiMyPageBookmarks key={v} page={v} />
      ))}
      {nextButton}
    </Box>
  );
}
