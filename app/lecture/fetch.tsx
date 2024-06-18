"use client";

import { HStack } from "@/components/basic/stack";
import styles from './common.module.css'
import SingleSearchResultView from "./SingleSearchResultView";

import { apiSearch } from "@/lib/api/search";

function Box({ children } : {children : React.ReactNode}) {
  return <HStack className='pb-8 pt-8 bg-neutral-50 dark:bg-neutral-950 flex-grow text-xl text-center pl-8 pr-8 md:pl-24 md:pr-24'>{children}</HStack>
}

export default async function SearchResultsView({ query }: { query: string }) {



  if (query === '') {
    return <Box>
    강의명, 교수명, 학수번호로 검색해보세요.
    </Box>
  }

  const results = await apiSearch({ keyword: query });

  if (results.status === "SUCCESS") {
    return (
      <Box>
        <div className={styles.container}>
          {results.data.map((course) => (
            <SingleSearchResultView key={course.course_id} course={course} />
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
