'use client';

import CoursePreview from '@/components/view/CoursePreview';

import { apiSearch } from '@/lib/api/calls/course';
import { useEffect, useState } from 'react';
import Button from '@/components/basic/button';
import Select from '@/components/basic/select';
import { DownIcon } from '@/lib/icons';
import Spinner from '@/components/basic/spinner';
import { useRouter } from 'next/navigation';
import { usePagination } from '@/lib/hooks/pagination';

import { Box, Grid, LoaderItems, SkeletonLoader } from './aux';

function SearchResultsViewWithOrder({ query: keyword, order }: { query: string; order: SearchOrdering }) {
  const [pages, fetchThis] = usePagination(apiSearch);

  useEffect(() => {
    fetchThis({ keyword, page: pages.page + 1, order: order });
  }, []);

  function fetchNext() {
    fetchThis({ keyword, page: pages.page + 1, order: order });
  }

  const nextButton = pages.eoc ? (
    <div>모두 불러왔습니다</div>
  ) : (
    <div className="w-full pt-6 flex flex-col justify-center items-center">
      {pages.failwith !== null && <div>오류!!</div>}
      <Button onClick={fetchNext}>
        <DownIcon />
      </Button>
    </div>
  );

  if (keyword === '') {
    return <p>강의명, 교수명, 학수번호로 검색해보세요.</p>;
  }

  if (pages.totalLoadingState === 'bot') {
    return <SkeletonLoader />;
  }

  if (pages.totalLoadingState === 'never') {
    return <p>{pages.failwith.message}</p>;
  }

  if (pages.data.length === 0) {
    return <p>검색 결과가 없습니다.</p>;
  }
  return (
    <>
      <Grid>
        {pages.data.map((course) => (
          <div key={course.course_id} className="animate-fade">
            <CoursePreview key={course.course_id} course={course} />
          </div>
        ))}
        {pages.loading && <LoaderItems />}
      </Grid>
      {pages.loading ? (
        <div className="text-xl">
          <Spinner />
        </div>
      ) : (
        nextButton
      )}
    </>
  );
}

export default function SearchResultsView({ query, sort }: { query: string; sort: SearchOrdering }) {
  const route = useRouter();
  const [order, setOrder] = useState<SearchOrdering>(sort);

  function handleValue(e: React.FormEvent<HTMLInputElement>) {
    setOrder((e.target as HTMLInputElement).value as SearchOrdering);
  }

  useEffect(() => {
    route.replace(`/lecture?q=${query}&s=${order}`);
  }, [order]);

  return (
    <Box>
      <Select
        value={order}
        handleValue={handleValue}
        items={
          [
            { value: 'NEWEST', label: '최신순' },
            { value: 'RATING_DESC', label: '별점 높은순' },
            { value: 'RATING_ASC', label: '별점 낮은순' },
          ] as const
        }
      />
      <SearchResultsViewWithOrder key={order} query={query} order={order} />
    </Box>
  );
}
