"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';

import { Course } from '@/lib/models/course';
import SearchForm from '@/components/composite/SearchForm';
import { HStack, VStack } from '@/components/basic/stack';
import { apiSearch } from '@/lib/api/search';


import SingleSearchResultView from './SingleSearchResultView';
import styles from './common.module.css';

const SearchTopView = ({ query }: { query: string }) => {
  return query ? (
    <VStack
      gap="20px"
      className={styles.borderBottom}
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
      className={styles.borderBottom}
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

const SearchResultsView = ({ query, results }: { query: string; results: Course[] | string }) => {
  if (Array.isArray(results)) {
    return (
      <HStack className='pb-8 pt-8 bg-neutral-50 dark:bg-neutral-950 flex-grow pl-8 pr-8 md:pl-24 md:pr-24'>
        <div className={styles.container}>
          {results.map((course) => (
            <SingleSearchResultView key={course.course_id} course={course} />
          ))}
        </div>
      </HStack>
    );
  }

  return (
    <HStack className={styles.results} style={{ padding: '40px', flexGrow: 1, textAlign: 'center' }}>
    <span className="text-xl text-center">
        {
          results
        }
      </span>
    </HStack>
  );
};

/* 
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
}
*/


function SearchPage() {

  const query = useSearchParams()?.get('q') || '';
  const [searchResult, setSearchResult] = useState<Course[] | string>(
      query.length === 0 ?
      "강의명, 교수명, 학수번호로 검색해보세요." :
      query.length <= 1 ?
      '너무 짧은 검색어입니다.'
      :
      '검색 중입니다.'
  );

  useEffect(() => {
    if (query.length > 1) {
      apiSearch({ keyword: query }).then((a) => {
        if (a.status === "SUCCESS") {
          setSearchResult(a.data);
        }
        else if (a.status === "ERROR") {
          setSearchResult(a.message);
        }
        else {
          setSearchResult("요청을 처리할 수 없습니다 : 장치 또는 서버가 오프라인일 수 있습니다.");
        }
      }
      )
    }
  }, [query]);


  return (
      <HStack className='h-full'>
        <SearchTopView query={query} />
        <SearchResultsView query={query} results={searchResult} />
      </HStack>
  );
}

export default function SearchPagePrerender() {
  return <Suspense fallback={<div />}>
    <SearchPage />
    </Suspense>

}