'use client';

import { HStack } from '@/components/basic/stack';
import styles from './common.module.css';
import SearchSingle from './SearchSingle';

import { SearchRequest, apiSearch } from '@/lib/api/course';
import { SearchBotLoading } from './loading';
import { useSessionId } from '@/context/SessionIdContext';
import { useEffect, useState } from 'react';
import { Course, CourseWithBookmark } from '@/lib/models/course';
import Button from '@/components/basic/button';
import Select from '@/components/basic/select';
import { DownIcon } from '@/icons';

function Box({ children }: { children: React.ReactNode }) {
  return (
    <HStack className="pb-8 pt-8 bg-neutral-50 dark:bg-neutral-950 flex-grow text-xl text-center pl-8 pr-8 md:pl-24 md:pr-24">
      {children}
    </HStack>
  );
}

function SearchResultsArrayView({
  courses,
  setCond,
  eoc,
}: {
  courses: CourseWithBookmark[];
  setCond: React.Dispatch<React.SetStateAction<Omit<SearchRequest, 'keyword'>>>;
  eoc: boolean;
}) {
  if (courses.length === 0) {
    return <Box>검색 결과가 없습니다.</Box>;
  }
  return (
    <Box>
      <Select
        defaultLabel="최신순"
        setValue={setCond}
        items={[
          { value: { order: 'NEWEST', page: 1 }, label: '최신순' },
          { value: { order: 'RATING_DESC', page: 1 }, label: '별점 높은순' },
          { value: { order: 'RATING_ASC', page: 1 }, label: '별점 낮은순' },
        ]}
      />
      <div className={styles.container}>
        {courses.map((course) => (
          <SearchSingle key={course.course_id} course={course} />
        ))}
      </div>
      {eoc || (
        <div className="w-full pt-6 flex flex-col justify-center items-center">
          <Button
            onClick={() =>
              setCond((v) => {
                return { ...v, page: v.page + 1 };
              })
            }
          >
            <DownIcon />
          </Button>
        </div>
      )}
    </Box>
  );
}

export default function SearchResultsView({ query: keyword }: { query: string }) {
  const [jwt] = useSessionId();
  const [courses, setCourses] = useState<null | CourseWithBookmark[]>(null);
  const [EOC, setEOC] = useState<boolean>(false);
  const [cond, setCond] = useState<Omit<SearchRequest, 'keyword'>>({ order: 'NEWEST', page: 1 });

  if (keyword === '') {
    return <Box>강의명, 교수명, 학수번호로 검색해보세요.</Box>;
  }

  useEffect(() => {
    apiSearch({ keyword, page: cond.page, order: cond.order }, { token: jwt?.accessToken }).then((a) => {
      if (a.status === 'SUCCESS') {
        if (a.data.length < 10) {
          setEOC(true);
        }

        if (cond.page === 1) {
          setCourses(a.data);
        } else {
          setCourses((courses || []).concat(a.data));
        }
      } else if (a.statusCode === 404) {
        setCourses(courses || []);
        setEOC(true);
      } else {
      }
    });
  }, [cond]);

  if (courses === null) {
    return <SearchBotLoading />;
  } else if (typeof courses === 'string') {
    return <div></div>;
  } else {
    return <SearchResultsArrayView setCond={setCond} courses={courses} eoc={EOC} />;
  }
}
