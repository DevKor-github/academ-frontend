'use server';

import SearchForm from '@/components/composite/SearchForm';
import { VStack } from '@/components/basic/stack';

import Link from 'next/link';
import { GET } from '@/lib/api-server/get';
import SearchPage from './fetch';
import { Box } from './aux';
import { URL_BUG_REPORT } from '@/lib/directive';

const SearchTopView = ({ query }: { query: string }) => {
  return query ? (
    <VStack className="gap-x-5 border-b light:border-b-base-27 dark:border-b-base-8 flex-wrap justify-between items-center md:px-24 px-10 py-28">
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

export default async function SearchPageServer({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const qCand = searchParams.q;
  const q = (Array.isArray(qCand) ? qCand[0] : qCand) || '';

  if (q === '') {
    return (
      <div className="flex flex-col h-full">
        <SearchTopView key={q} query={q} />
        <Box>
          <span>강의명, 교수명, 학수번호로 검색해보세요.</span>
        </Box>
      </div>
    );
  } else if (q.length < 2) {
    return (
      <div className="flex flex-col h-full">
        <SearchTopView key={q} query={q} />
        <Box>
          <span>검색어는 2글자 이상이어야 합니다.</span>
        </Box>
      </div>
    );
  }

  const count = await GET<ReqSearch, number>('/api/course/search/count-result')({
    keyword: q,
  });

  if (count.status !== 'SUCCESS') {
    if (count.statusCode === 404) {
      return (
        <div className="flex flex-col h-full">
          <SearchTopView key={q} query={q} />
          <Box>
            <span>결과가 없습니다.</span>
          </Box>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col h-full">
          <SearchTopView key={q} query={q} />
          <Box>
            <span>
              알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요. 오류가 계속되는 경우,{' '}
              <Link href={URL_BUG_REPORT}>제보</Link>를 부탁드려요.
            </span>
          </Box>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col h-full">
      <SearchTopView key={q} query={q} />
      <SearchPage keyword={q} count={count} />
    </div>
  );
}
