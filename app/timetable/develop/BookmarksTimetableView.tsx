import { CourseLoadingItems } from '@/app/lecture/aux';
import Button from '@/components/basic/button';
import { HStack } from '@/components/basic/stack';
import { BookmarkIcon, DownIcon } from '@/components/icon';
import CourseTimetable from '@/components/view/CourseTimetable';
import { apiMyPageBookmarks, apiMyPageBookmarksCount } from '@/lib/api-client/calls/mypage';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';
import { ELEM_PER_PAGE } from '@/lib/directive';
import { useApi } from '@/lib/hooks/api';
import { lengthOf } from '@/lib/util';
import { memo, useState } from 'react';

function Scroll({ children }: React.PropsWithChildren) {
  return (
    <HStack className="h-full w-full transition-all light:bg-base-31 dark:bg-base-2">
      <div className="overflow-y-scroll w-full">
        <div className="flex flex-col h-fit pt-4 gap-4">{children}</div>
      </div>
    </HStack>
  );
}

const ApiTimetableBookmarks = memo(
  function ApiTimetableBookmarks({ page }: ReqPaginated) {
    const [{ instances }] = useAuthTokens();
    const { loading, response: bms } = useApi(instances.doRefresh, apiMyPageBookmarks, { page });

    if (loading) {
      return <CourseLoadingItems />;
    }

    if (bms.status !== 'SUCCESS') {
      return <div>오류 발생</div>;
    }

    return bms.data.flatMap((v) => <CourseTimetable key={v.course_id} course={v} />);
  },
  (prev, next) => prev.page === next.page,
);

export function BookmarksTimetableView() {
  const [{ instances }] = useAuthTokens();

  const { loading, response: totalCount } = useApi(instances.doRefresh, apiMyPageBookmarksCount, {});
  const [page, setPage] = useState<number>(1);

  if (loading) {
    return <Scroll>...</Scroll>;
  }
  const totalPage = Math.ceil(totalCount.data / ELEM_PER_PAGE);
  const pages = lengthOf(page, 1);

  if (totalCount.status !== 'SUCCESS') {
    return <div>오류</div>;
  }

  if (totalCount.data <= 0) {
    return (
      <Scroll>
        <div className="self-center bg-base-32 p-8 rounded-xl border border-base-28">
          표시할 강의가 없습니다. 강의 페이지에서{' '}
          <span className="text-base-10">
            <BookmarkIcon />
          </span>
          을 눌러 강의를 책갈피에 저장해보세요!
        </div>
      </Scroll>
    );
  }

  const nextButton =
    page >= totalPage ? (
      <div />
    ) : (
      <div className="w-full pt-6 flex flex-col justify-center items-center">
        <Button onClick={() => setPage((n) => n + 1)}>
          <DownIcon />
        </Button>
      </div>
    );

  return (
    <Scroll>
      {pages.flatMap((v) => (
        <ApiTimetableBookmarks key={v} page={v} />
      ))}
      {nextButton}
    </Scroll>
  );
}
