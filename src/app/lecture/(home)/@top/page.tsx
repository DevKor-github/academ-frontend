'use client';
import { searchCourseCount } from '@/app/api/lecture.api';
import { VStack } from '@/components/basic/stack';
import SearchForm from '@/components/composite/SearchForm';
import { useQuery } from '@tanstack/react-query';
import useSearchKeyword from '../util';

export default function Page() {
  const keyword = useSearchKeyword();

  const { data: count } = useQuery({
    queryKey: ['searchCount', keyword],
    queryFn: async () => (keyword === undefined ? null : await searchCourseCount({ keyword })),
  });

  return (
    <VStack
      className="not-md:sticky not-md:top-16 z-40 bg-white flex-wrap justify-evenly items-center
    gap-x-5 border-b light:border-b-base-27 dark:border-b-base-8
    md:px-24 px-10 not-md:pt-8 md:py-28"
    >
      {keyword && (
        <span className="text-2xl" style={{ wordBreak: 'break-word' }}>
          <span className="text-4xl">&quot;{keyword}&quot;</span> 강의 검색 결과{' '}
          {count !== null && count !== undefined && count.data >= 0 && <span className="text-base-20">{count.data}개</span>}
        </span>
      )}

      <SearchForm className="sticky top-8 w-full md:w-[70%] md:max-w-[800px]" defaultValue={keyword} />
    </VStack>
  );
}
