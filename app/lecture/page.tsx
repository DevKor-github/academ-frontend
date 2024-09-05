'use server';

import SearchForm from '@/components/composite/SearchForm';
import { VStack } from '@/components/basic/stack';

import dynamic from 'next/dynamic';
import { Box, SkeletonLoader } from './aux';
import Select from '@/components/basic/select';

const SearchTopView = ({ query }: { query: string }) => {
  return query ? (
    <VStack
      gap="20px"
      className="border-b light:border-b-light-back-5 dark:border-b-dark-back-8 flex-wrap justify-between items-center"
      style={{
        padding: '110px 40px 110px 40px',
      }}
    >
      <span className="text-2xl" style={{ wordBreak: 'break-word' }}>
        <span className="text-4xl">&quot;{query}&quot;</span> 강의 검색 결과
      </span>

      <SearchForm className="sticky top-8 w-full md:w-[70%] md:max-w-[800px]" defaultValue={query} />
    </VStack>
  ) : (
    <VStack
      className="border-b light:border-b-light-back-1 dark:border-b-dark-back-5 flex-wrap justify-center items-center"
      style={{
        padding: '110px 40px 110px 40px',
      }}
    >
      <SearchForm className="w-full md:w-[70%] md:max-w-[800px]" defaultValue={query} />
    </VStack>
  );
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const qCand = searchParams?.q;
  const q = (Array.isArray(qCand) ? qCand[0] : qCand) || '';

const SearchResultsView = dynamic(() => import('./results'), {
  ssr: false, loading: () => 
  (
    <Box>
      <Select
        value={'NEWEST'}
        items={[
          { value: 'NEWEST', label: '최신순' },
          { value: 'RATING_DESC', label: '별점 높은순' },
          { value: 'RATING_ASC', label: '별점 낮은순' },
        ] as const}
      />
      { q ? <SkeletonLoader /> : <Box>강의명, 교수명, 학수번호로 검색해보세요.</Box>}
    </Box>
  )
 });

  return (
    <div className="flex flex-col h-full">
      <SearchTopView query={q} />
      <SearchResultsView query={q} />
    </div>
  );
}
