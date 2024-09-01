'use client';

import { HStack } from '@/components/basic/stack';
import styles from './results.module.css';
import SearchSingle from '../SearchSingle';

import { apiSearch } from '@/lib/api/course';
import { useSessionId } from '@/context/SessionIdContext';
import { useEffect, useState } from 'react';
import Button from '@/components/basic/button';
import Select from '@/components/basic/select';
import { DownIcon } from '@/icons';

import { usePagination } from '@/lib/hooks/pagination';

function Box({ children }: { children: React.ReactNode }) {
  return (
    <HStack className="pb-8 pt-8 bg-neutral-50 dark:bg-neutral-950 flex-grow text-xl text-center pl-8 pr-8 md:pl-24 md:pr-24">
      {children}
    </HStack>
  );
}

function SearchResultsArrayView({
  courses,
  nextButton,
}: {
  courses: CourseWithBookmark[];
  nextButton: React.ReactNode;
}) {
  if (courses.length === 0) {
    return <Box>검색 결과가 없습니다.</Box>;
  }
  return (<>
      <div className={styles.container}>
        {courses.map((course) => (
          <SearchSingle key={course.course_id} course={course} />
        ))}
      </div>
    {nextButton}
  </>
  );
}

function SearchResultsViewWithOrder({ query: keyword, order }: { query: string; order: SearchOrdering }) {
  const [jwt] = useSessionId();

  const [pages, fetchThis] = usePagination(apiSearch);

  useEffect(
    () => {
        fetchThis({ keyword, page: pages.page + 1, order: order }, { token: jwt?.accessToken });
    }
    , []);
  
  function fetchNext() {
    fetchThis({ keyword, page: pages.page + 1, order: order }, { token: jwt?.accessToken });
  }

  const nextButton = (pages.eoc ? <div>모두 로드했습니다.</div> :
    <div className="w-full pt-6 flex flex-col justify-center items-center">
      {pages.failwith !== null && <div>오류!!</div>}
      <Button
        onClick={fetchNext}
      >
        <DownIcon />
      </Button>
    </div>);
  

  if (keyword === '') {
    return <Box>강의명, 교수명, 학수번호로 검색해보세요.</Box>;
  }

  if (pages.loadingState === 'bot') {
    return <div />;
  }

  if (pages.loadingState === 'never') {
    return <Box>{pages.failwith.message}</Box>;
  }
  
  return <SearchResultsArrayView courses={pages.data} nextButton={nextButton} />;

} 

export default function SearchResultsView({ query }: { query: string }) {
  
  const [order, setOrder] = useState<SearchOrdering>('NEWEST');

  useEffect(() => {

  }, [order]);

  return (<Box>
    <Select
      defaultLabel="최신순"
      setValue={setOrder}
      items={[
        { value: 'NEWEST', label: '최신순' },
        { value: 'RATING_DESC', label: '별점 높은순' },
        { value: 'RATING_ASC', label: '별점 낮은순' },
      ] as const}
    />
    {<SearchResultsViewWithOrder key={order} query={query} order={order} />}
  </Box>);

}
