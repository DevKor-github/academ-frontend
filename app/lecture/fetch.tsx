'use client';

import Link from 'next/link';
import { useState } from 'react';

import { apiSearchCount } from '@/lib/api-client/calls/course';
import Button from '@/component/basic/button';
import { DownIcon } from '@/component/icon';

import { Grid } from './aux';
import { ELEM_PER_PAGE } from '@/lib/directive';
import { useApi } from '@/lib/hooks/api';

import { memo } from 'react';
import { apiSearch } from '@/lib/api-client/calls/course';

import CoursePreview from '@/component/view/CoursePreview';
import { Box, CourseLoadingItems } from './aux';

const SearchResults = memo(
  function SearchResults({ keyword, order, page }: ReqSearchCourse) {
    const { loading, response } = useApi(apiSearch, { keyword, order, page });

    if (loading) {
      return <CourseLoadingItems />;
    }

    if (response.status !== 'SUCCESS') {
      return <Box>오류가 발생했습니다.</Box>;
    }

    return (
      <>
        {response.data.map((course) => (
          <div key={course.course_id} className="animate-fade">
            <CoursePreview key={course.course_id} course={course} />
          </div>
        ))}
      </>
    );
  },
  (prev, next) =>
    prev != undefined &&
    next != undefined &&
    prev.keyword === next.keyword &&
    prev.order === next.order &&
    prev.page === next.page,
);

function SearchResultsViewWithOrder({
  query: keyword,
  order,
  totalPage,
}: {
  query: string;
  order: SearchOrdering;
  totalPage: number;
}) {
  const [page, setPage] = useState<number>(1);

  const nextButton =
    page >= totalPage ? (
      <div>모두 불러왔습니다</div>
    ) : (
      <div className="w-full pt-6 flex flex-col justify-center items-center">
        <Button onClick={() => setPage((n) => n + 1)}>
          <DownIcon />
        </Button>
      </div>
    );

  if (keyword === '') {
    return <p>강의명, 교수명, 학수번호로 검색해보세요.</p>;
  }

  return (
    <>
      <Grid>
        {new Array(page)
          .fill(null)
          .map((_, i) => i + 1)
          .flatMap((v) => (
            <SearchResults key={v} keyword={keyword} order={order} page={v} />
          ))}
      </Grid>
      {nextButton}
    </>
  );
}

export default function SearchResultsView({ query, sort }: { query: string; sort: SearchOrdering }) {
  const { loading, response: lectureCount } = useApi(apiSearchCount, { keyword: query });

  if (query === '') {
    return <span>강의명, 교수명, 학수번호로 검색해보세요.</span>;
  }

  if (loading) {
    return <></>;
  }

  if (lectureCount.status != 'SUCCESS') {
    return lectureCount.statusCode === 401 ? (
      <span>
        <Link href="/login" className="text-primary-500 underline">
          로그인
        </Link>{' '}
        후 이용해주세요.
      </span>
    ) : (
      lectureCount.message
    );
  }

  if (lectureCount.data <= 0) {
    return '검색 결과가 없습니다.';
  }

  return (
    <SearchResultsViewWithOrder query={query} order={sort} totalPage={Math.ceil(lectureCount.data / ELEM_PER_PAGE)} />
  );
}
