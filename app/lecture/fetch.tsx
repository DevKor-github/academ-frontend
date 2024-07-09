'use client';

import { HStack } from '@/components/basic/stack';
import styles from './common.module.css';
import SearchSingle from './SearchSingle';

import { SearchRequest, apiSearch } from '@/lib/api/course';
import { SearchBotLoading } from './loading';
import { useSessionId } from '@/context/SessionIdContext';
import { useEffect, useState } from 'react';
import { Course } from '@/lib/models/course';
import Button from '@/components/basic/button';

function Box({ children }: { children: React.ReactNode }) {
  return (
    <HStack className="pb-8 pt-8 bg-neutral-50 dark:bg-neutral-950 flex-grow text-xl text-center pl-8 pr-8 md:pl-24 md:pr-24">
      {children}
    </HStack>
  );
}

function SearchResultsArrayView({
  courses,
  setPage,
  eoc,
}: {
  courses: Course[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  eoc: boolean;
}) {
  if (courses.length === 0) {
    return <Box>검색 결과가 없습니다.</Box>;
  }

  return (
    <Box>
      <div className={styles.container}>
        {courses.map((course) => (
          <SearchSingle key={course.course_id} course={course} />
        ))}
      </div>
      {eoc || (
        <div className="w-full pt-6 flex flex-col justify-center items-center">
          <Button onClick={() => setPage((v) => v + 1)}>더 불러오기</Button>
        </div>
      )}
    </Box>
  );
}

export default function SearchResultsView({ query: keyword }: { query: string }) {
  const [jwt] = useSessionId();
  const [courses, setCourses] = useState<null | Course[]>(null);
  const [EOC, setEOC] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<SearchRequest['order']>('NEWEST');

  if (keyword === '') {
    return <Box>강의명, 교수명, 학수번호로 검색해보세요.</Box>;
  }

  useEffect(() => {
    apiSearch({ keyword, page, order }, { token: jwt?.accessToken }).then((a) => {
      if (a.status === 'SUCCESS') {
        if (a.data.length < 10) {
          setEOC(true);
        }

        if (courses === null) {
          setCourses(a.data);
        } else {
          setCourses(courses.concat(a.data));
        }
      } else if (a.statusCode === 404) {
        setCourses(courses || []);
        setEOC(true);
      } else {
      }
    });
  }, [page]);

  if (courses === null) {
    return <SearchBotLoading />;
  } else {
    return <SearchResultsArrayView setPage={setPage} courses={courses} eoc={EOC} />;
  }
}
