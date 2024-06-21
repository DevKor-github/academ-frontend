"use client";

import { HStack } from "@/components/basic/stack";
import styles from './common.module.css'
import SearchSingle from "./SearchSingle";

import { useApiSearch } from "@/lib/api/course";
import { SearchBotLoading } from "./loading";


function Box({ children } : {children : React.ReactNode}) {
  return <HStack className='pb-8 pt-8 bg-neutral-50 dark:bg-neutral-950 flex-grow text-xl text-center pl-8 pr-8 md:pl-24 md:pr-24'>{children}</HStack>
}

export default function SearchResultsView({ query }: { query: string }) {

  if (query === '') {
    return <Box>
    강의명, 교수명, 학수번호로 검색해보세요.
    </Box>
  }

  const results = useApiSearch({ keyword: query });

  if (results === null) {
    return <SearchBotLoading />
  }

  if (results.status === "SUCCESS") {
    return (
      <Box>
        <div className={styles.container}>
          {results.data.map((course) => (
            <SearchSingle key={course.course_id} course={course} />
          ))}
        </div>
      </Box>
    );
  }
  
  else {
    return <Box>
    {results.message}
    </Box>
  }

};
