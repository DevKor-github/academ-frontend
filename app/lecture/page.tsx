import SearchForm from '@/components/composite/SearchForm';
import { HStack, VStack } from '@/components/basic/stack';



import { SearchBotLoading } from './loading';

import dynamic from 'next/dynamic';

const SearchResultsView = dynamic(() => import('./fetch'), { ssr: false, loading: SearchBotLoading})

const SearchTopView = ({ query }: { query: string }) => {
  
  return query ? (
    <VStack
      gap="20px"
      className="border-b border-b-neutral-200"
      style={{
        padding: '110px 40px 110px 40px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <span className='text-2xl' style={{ wordBreak: 'break-word' }}>
        <span className='text-4xl'>&quot;{query}&quot;</span> 강의 검색 결과
      </span>

      <SearchForm className="w-full md:w-[70%] md:max-w-[800px]" defaultValue={query} />
    </VStack>
  ) : (
      <VStack
      className="border-b border-b-neutral-200"
      style={{
        padding: '110px 40px 110px 40px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <SearchForm className="w-full md:w-[70%] md:max-w-[800px]" defaultValue={query} />
    </VStack>
  );
};


export default function SearchPage({ searchParams } : {   searchParams?: { [key: string]: string | string[] | undefined } }) {

  const qCand = searchParams?.q;
  const q = (Array.isArray(qCand) ? qCand[0] : qCand) || '';

  return (
    <HStack className='h-full'>
      <SearchTopView query={q} />
      <SearchResultsView query={q} />
    </HStack>
  );
  
}