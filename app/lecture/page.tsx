'use client';

import SearchForm from '@/components/composite/SearchForm';
import { VStack } from '@/components/basic/stack';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Box, Grid, LoaderItems } from './aux';
import Select from '@/components/basic/select';

const SearchTopView = ({ query }: { query: string }) => {
  return query ? (
    <VStack
      gap="20px"
      className="border-b light:border-b-base-27 dark:border-b-base-8 flex-wrap justify-between items-center md:px-24 px-10 py-28"
    >
      <span className="text-2xl" style={{ wordBreak: 'break-word' }}>
        <span className="text-4xl">&quot;{query}&quot;</span> 강의 검색 결과
      </span>

      <SearchForm className="sticky top-8 w-full md:w-[70%] md:max-w-[800px]" defaultValue={query} />
    </VStack>
  ) : (
    <VStack
      className="border-b light:border-b-base-30 dark:border-b-base-5 flex-wrap justify-center items-center"
      style={{
        padding: '110px 40px 110px 40px',
      }}
    >
      <SearchForm className="w-full md:w-[70%] md:max-w-[800px]" defaultValue={query} />
    </VStack>
  );
};

const sortCriterias = [
  { value: 'NEWEST', label: '최신순' },
  { value: 'RATING_DESC', label: '별점 높은순' },
  { value: 'RATING_ASC', label: '별점 낮은순' },
] as const;

export default function SearchPage() {
  const params = useSearchParams();
  
  const qCand = params.get('q');
  const sCand = params.get('s');

  const q = (Array.isArray(qCand) ? qCand[0] : qCand) || '';
  const s = (Array.isArray(sCand) ? sCand[0] : sCand) || '';
  const sort: SearchOrdering = sortCriterias.map(({ value }) => value).includes(s as SearchOrdering)
    ? (s as SearchOrdering)
    : 'NEWEST';

  const SearchResultsView = dynamic(() => import('./fetch'), {
    ssr: false,
    loading: () =>
      q ? (
        <Grid>
          <LoaderItems />
        </Grid>
      ) : (
        <span>강의명, 교수명, 학수번호로 검색해보세요.</span>
      ),
  });

  // this is not an actual SetState
  function setSort(newOrder: SearchOrdering) {
    route.replace(`/lecture?q=${q}&s=${newOrder}`);
  }

  function handleValue(e: React.FormEvent<HTMLInputElement>) {
    const newOrder = (e.target as HTMLInputElement).value as SearchOrdering;
    setSort(newOrder);
  }

  return (
    <div className="flex flex-col h-full">
      <SearchTopView key={q} query={q} />
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
        <SearchResultsView key={q} query={q} sort={sort} />
      </Box>
    </div>
  );
}
