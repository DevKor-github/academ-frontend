'use client';
import { HStack, VStack } from '@/components/basic/stack';
import Button from '@/components/basic/button';
import { BookmarkIcon, RightIcon } from '@/components/icon';
import { ELEM_PER_PAGE } from '@/data/constant';
import CoursePreview from '@/components/view/CoursePreview';
import { CourseLoadingItems } from '@/app/lecture/aux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MyPageBookmarks } from '../../../../api/mypage.api';
interface Props {
  totalCount: number;
}

export default function BookmarksView({ totalCount }: Props) {
  const totalPage = Math.ceil(totalCount / ELEM_PER_PAGE);

  const {
    isFetching,
    // isPending,
    isFetchingNextPage,
    data: bms,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['mypage', 'bookmarks'],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      MyPageBookmarks(pageParam) as Promise<{ data: Course[]; cursor: number }>,
    initialPageParam: 1,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => (lastPage.cursor < totalPage ? lastPage.cursor + 1 : undefined),
    select: (data) => (data.pages ?? []).flatMap((page) => page.data),
  });

  if (totalCount <= 0) {
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

  const nextButton = hasNextPage ? (
    <Button kind="blank" onClick={() => fetchNextPage()}>
      <RightIcon />
    </Button>
  ) : (
    <div aria-hidden />
  );

  return (
    <Box>
      {bms.map((v) => (
        <CoursePreview key={v.course_id} course={v} />
      ))}
      {(isFetching || isFetchingNextPage) && <CourseLoadingItems />}
      {nextButton}
    </Box>
  );
}

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
