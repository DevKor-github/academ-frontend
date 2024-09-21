'use client';

import { apiSearchCount } from '@/lib/api/calls/course';
import { use, useState } from 'react';
import Button from '@/components/basic/button';
import { DownIcon } from '@/lib/icons';

import { Grid, LoaderItems } from './aux';
import dynamic from 'next/dynamic';
import { ELEM_PER_PAGE } from '@/lib/directive';
import Link from 'next/link';

const SearchResults = dynamic(() => import('./results'), { ssr: false, loading: LoaderItems });

function SearchResultsViewWithOrder({
  query: keyword,
  order,
  pages,
}: {
  query: string;
  order: SearchOrdering;
  pages: number;
}) {
  const [lastPage, setLastPage] = useState<number>(1);

  const nextButton =
    lastPage >= pages ? (
      <div>모두 불러왔습니다</div>
    ) : (
      <div className="w-full pt-6 flex flex-col justify-center items-center">
        <Button onClick={() => setLastPage((n) => n + 1)}>
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
        {new Array(lastPage)
          .fill(null)
          .map((_, i) => i + 1)
          .flatMap((v) => (
            <SearchResults keyword={keyword} order={order} page={v} />
          ))}
      </Grid>
      {nextButton}
    </>
  );
}

export default function SearchResultsView({ query, sort }: { query: string; sort: SearchOrdering }) {
  const lectureCount = use(apiSearchCount({ keyword: query }));

  if (lectureCount.status != 'SUCCESS') {
    return lectureCount.statusCode === 401 ? (
      <span>
        <Link href="/login" className="text-primary-500 underline">
          로그인
        </Link>
        이 필요합니다.
      </span>
    ) : (
      lectureCount.message
    );
  }

  if (lectureCount.data <= 0) {
    return '검색 결과가 없습니다.';
  }

  return <SearchResultsViewWithOrder query={query} order={sort} pages={Math.ceil(lectureCount.data / ELEM_PER_PAGE)} />;
}
