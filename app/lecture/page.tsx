import SearchForm from '@/components/composite/SearchForm';
import { VStack } from '@/components/basic/stack';

import dynamic from 'next/dynamic';
import { Box } from './aux';
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

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: qCand, s: sCand } = searchParams || {};

  const q = (Array.isArray(qCand) ? qCand[0] : qCand) || '';
  const s = (Array.isArray(sCand) ? sCand[0] : sCand) || '';
  const sort: SearchOrdering = sortCriterias.map(({ value }) => value).includes(s as SearchOrdering)
    ? (s as SearchOrdering)
    : 'NEWEST';

  const SearchResultsView = dynamic(() => import('./fetch'), {
    ssr: false,
    loading: () => (
      <Box>
        <Select value={sort} items={sortCriterias} />
        {q ? <div /> : <span>강의명, 교수명, 학수번호로 검색해보세요.</span>}
      </Box>
    ),
  });

  return (
    <div className="flex flex-col h-full">
      <SearchTopView key={q} query={q} />
      <SearchResultsView query={q} sort={sort} />
    </div>
  );
}
