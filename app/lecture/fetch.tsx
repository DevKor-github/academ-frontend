'use client';

import { apiSearchCount } from '@/lib/api/calls/course';
import { use, useState } from 'react';
import Button from '@/components/basic/button';
import Select from '@/components/basic/select';
import { DownIcon } from '@/lib/icons';
import { useRouter } from 'next/navigation';

import { Box, Grid, LoaderItems } from './aux';
import dynamic from 'next/dynamic';
import { ELEM_PER_PAGE } from '@/lib/directive';

const SearchResults = dynamic(() => import('./results'), { ssr: false, loading: LoaderItems });

function SearchResultsViewWithOrder({ query: keyword, order, pages }: { query: string; order: SearchOrdering; pages: number }) {
  const [lastPage, setLastPage] = useState<number>(1);

  const nextButton = lastPage >= pages ? (
    <div>모두 불러왔습니다</div>
  ) : (
    <div className="w-full pt-6 flex flex-col justify-center items-center">
      <Button onClick={() => setLastPage((n) => n+1)}>
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
        {(new Array(lastPage).fill(null).map((_, i) => i + 1)).flatMap((v) => <SearchResults keyword={keyword} order={order} page={v} />)}
      </Grid>
      {nextButton}
    </>
  );
}

export default function SearchResultsView({ query , sort }: { query: string; sort: SearchOrdering }) {

  const route = useRouter();
  const lectureCount = use(apiSearchCount({ keyword: query }));
  const [order, setOrder] = useState<SearchOrdering>(sort);
  
  function BoxWithSelect({ children }: React.PropsWithChildren) {
    return (<Box>
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
      {children}
    </Box>);
  }

  function handleValue(e: React.FormEvent<HTMLInputElement>) {
    const newOrder = (e.target as HTMLInputElement).value as SearchOrdering;
    setOrder(newOrder);
    route.replace(`/lecture?q=${query}&s=${newOrder}`);
  }

  if (lectureCount.status != 'SUCCESS') {
    return ((lectureCount.statusCode === 401) ? <BoxWithSelect>로그인이 필요합니다.</BoxWithSelect> : <BoxWithSelect>{lectureCount.message}</BoxWithSelect>);
  }

  if (lectureCount.data <= 0) {
    return <BoxWithSelect>검색 결과가 없습니다.</BoxWithSelect>;
  }

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
      <SearchResultsViewWithOrder key={order} query={query} order={order} pages={Math.ceil(lectureCount.data / ELEM_PER_PAGE)} />
    </Box>
  );
}
