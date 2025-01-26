'use client';

import { useSearchParams } from 'next/navigation';
import Button from '@/components/basic/button';
import CoursePreview from '@/components/view/CoursePreview';
import { DownIcon } from '@/components/icon';
import { Box, CourseLoadingItems, Grid } from '../aux';
import { ELEM_PER_PAGE } from '@/data/constant';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { searchCourse, searchCourseCount } from '@/app/api/lecture.api';
import Link from 'next/link';
import useSearchKeyword from '../util';
import type { Course, CourseOnly, CourseSearchOrdering } from '@/types/course.types';

function SearchResultsViewWithOrder({
  query,
  order,
  totalPage,
}: {
  query: string;
  order: CourseSearchOrdering;
  totalPage: number;
}) {
  const {
    isFetching,
    // isPending,
    isFetchingNextPage,
    data: lct,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['lecture_search', query, order],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      searchCourse({ page: pageParam, order, keyword: query }) as Promise<
        ApiResponse<Course[] | CourseOnly[]> & { cursor: number }
      >,
    initialPageParam: 1,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => (lastPage.cursor < totalPage ? lastPage.cursor + 1 : undefined),
    select: (data) => (data.pages ?? []).flatMap((page) => page.data),
  });

  const NextButton = hasNextPage ? (
    <div className="w-full pt-6 flex flex-col justify-center items-center">
      <Button onClick={() => fetchNextPage()}>
        <DownIcon />
      </Button>
    </div>
  ) : (
    <div>모두 불러왔습니다</div>
  );

  return (
    <>
      <Grid>
        {lct.map((course) => (
          <div key={course.course_id} className="animate-fade">
            <CoursePreview key={course.course_id} course={course} />
          </div>
        ))}
        {(isFetching || isFetchingNextPage) && <CourseLoadingItems />}
      </Grid>
      {NextButton}
    </>
  );
}

const sortCriterias = [
  { value: 'NEWEST', label: '최신순' },
  { value: 'RATING_DESC', label: '별점 높은순' },
  { value: 'RATING_ASC', label: '별점 낮은순' },
] as const;

export default function SearchPage() {
  const sCand = useSearchParams().get('s');
  const s = (Array.isArray(sCand) ? sCand[0] : sCand) || '';
  const sort: CourseSearchOrdering = sortCriterias.map(({ value }) => value).includes(s as CourseSearchOrdering)
    ? (s as CourseSearchOrdering)
    : 'NEWEST';

  const keyword = useSearchKeyword();

  const { data: count } = useQuery({
    queryKey: ['searchCount', keyword],
    queryFn: async () => (keyword === undefined ? null : await searchCourseCount({ keyword })),
  });

  if (keyword === undefined || keyword === '') {
    return <span>강의명, 교수명, 학수번호로 검색해보세요.</span>;
  } else if (keyword.length < 2) {
    return <span>검색어는 2글자 이상이어야 합니다.</span>;
  }

  if (count === undefined) return <Box />;

  if (count === null || count.status !== 'SUCCESS') {
    if (count === null || count.statusCode === 404) {
      return <span>결과가 없습니다.</span>;
    } else {
      return (
        <span>
          {typeof count}
          {JSON.stringify(count)}
          {count.status}알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요. 오류가 계속되는 경우,{' '}
          <Link href={process.env.NEXT_PUBLIC_BUG_REPORT}>제보</Link>를 부탁드려요.
        </span>
      );
    }
  }

  return (
    <SearchResultsViewWithOrder
      key={sort}
      query={keyword}
      order={sort}
      totalPage={Math.ceil(count.data / ELEM_PER_PAGE)}
    />
  );
}
