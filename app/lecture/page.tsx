import SearchForm from '@/components/composite/SearchForm';
import { VStack } from '@/components/basic/stack';

import dynamic from 'next/dynamic';

import { Spinner2 } from '@/components/basic/spinner';

const SearchResultsView = dynamic(() => import('./result/results'), {
  ssr: false, loading: () => 
  (<div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner2 /></div>)
 });

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

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const qCand = searchParams?.q;
  const q = (Array.isArray(qCand) ? qCand[0] : qCand) || '';

  return (
    <div className="flex flex-col h-full">
      <SearchTopView query={q} />
      <SearchResultsView query={q} />
    </div>
  );
}
