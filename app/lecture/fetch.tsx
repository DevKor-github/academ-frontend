'use client';

import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import Button from '@/components/basic/button';
import CoursePreview from '@/components/view/CoursePreview';
import { DownIcon } from '@/components/icon';
import Select from '@/components/basic/select';

import { Box, CourseLoadingItems, Grid } from './aux';

import { apiSearch } from '@/lib/api-client/calls/course';
import { ELEM_PER_PAGE } from '@/lib/directive';
import { useApi } from '@/lib/hooks/api';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';
import { lengthOf } from '@/lib/util';

const SearchResults = memo(
  function SearchResults({ keyword, order, page }: ReqSearchCourse) {
    const [{ instances }] = useAuthTokens();
    const { loading, response } = useApi(instances.refreshFirst, apiSearch, { keyword, order, page });

    if (loading) {
      return <CourseLoadingItems />;
    }

    if (response.status !== 'SUCCESS') {
      return <Box>오류가 발생했습니다.</Box>;
    }

    return response.data.flatMap((course) => (
      <div key={course.course_id} className="animate-fade">
      <CoursePreview key={course.course_id} course={course} />
      </div>
    ));
  },
  (p, n) => p.keyword === n.keyword && p.order === n.order && p.page === n.page,
);

function SearchResultsViewWithOrder({
  query,
  order,
  totalPage,
}: {
  query: string;
  order: SearchOrdering;
  totalPage: number;
}) {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    console.error(`page: ${page}, query: ${query}, order: ${order}, totalPage: ${totalPage}`);
  }, [page, query, order, totalPage]);

  const NextButton =
    page >= totalPage ? (
      <div>모두 불러왔습니다</div>
    ) : (
      <div className="w-full pt-6 flex flex-col justify-center items-center">
        <Button onClick={() => setPage((n) => n + 1)}>
          <DownIcon />
        </Button>
      </div>
    );

  return (
    <>
      <Grid>
        {lengthOf(page, 1).flatMap((v) => (
          <SearchResults key={v} keyword={query} order={order} page={v} />
        ))}
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
        id="order"
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
