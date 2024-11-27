'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/basic/button';
import CoursePreview from '@/components/view/CoursePreview';
import { DownIcon } from '@/components/icon';
import Select from '@/components/basic/select';
import { Box, CourseLoadingItems, Grid } from './aux';
import { ELEM_PER_PAGE } from '@/data/constant';
import { useInfiniteQuery } from '@tanstack/react-query';
import { search } from '@/app/api/lecture.api';

function SearchResultsViewWithOrder({
  query,
  order,
  totalPage,
}: {
  query: string;
  order: SearchOrdering;
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
      search({ page: pageParam, order, keyword: query }) as Promise<
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

export default function SearchPage({ keyword, count }: { keyword: string; count: ApiResponse<number> }) {
  /* count => SUCCESS, data is always positive */

  const route = useRouter();

  const sCand = useSearchParams().get('s');
  const s = (Array.isArray(sCand) ? sCand[0] : sCand) || '';
  const sort: SearchOrdering = sortCriterias.map(({ value }) => value).includes(s as SearchOrdering)
    ? (s as SearchOrdering)
    : 'NEWEST';

  function handleValue(e: React.FormEvent<HTMLInputElement>) {
    const newOrder = (e.target as HTMLInputElement).value as SearchOrdering;
    route.replace(`/lecture?q=${keyword}&s=${newOrder}`);
  }

  return (
    <Box>
      <Select
        name="order"
        value={sort}
        handleValue={handleValue}
        items={
          [
            { value: 'NEWEST', label: '최신순' },
            { value: 'RATING_DESC', label: '별점 높은순' },
            { value: 'RATING_ASC', label: '별점 낮은순' },
          ] as const
        }
      />
      <SearchResultsViewWithOrder
        key={sort}
        query={keyword}
        order={sort}
        totalPage={Math.ceil(count.data / ELEM_PER_PAGE)}
      />
    </Box>
  );
}
