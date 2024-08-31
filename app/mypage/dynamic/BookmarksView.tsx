'use client';

import { HStack, VStack } from "@/components/basic/stack";
import SearchSingle from "@/app/lecture/SearchSingle";

import { apiMyPageBookmarks } from "@/lib/api/mypage";
import { usePagination } from "@/lib/hooks/pagination";
import { useEffect } from "react";
import { useSessionId } from "@/context/SessionIdContext";
import Button from "@/components/basic/button";
import { RightIcon } from "@/icons";

export default function BookmarksView() {

  const [jwt] = useSessionId();
  const [pages, fetchThis] = usePagination(apiMyPageBookmarks);

  function fetchNext() {
    fetchThis({ page: pages.page + 1 }, { token: jwt?.accessToken });
  }

  useEffect(fetchNext, []);
  
  if (pages.neverLoaded) {
    return <div />;
  }

  const showMoreButton = (
    pages.eoc ? <div /> : <Button kind="blank" onClick={fetchNext}><RightIcon /></Button>
  );

  return (
    <HStack
      className="pl-2 pr-2 md:pl-8 md:pr-8 pt-24 h-full transition-all
  light:bg-light-back-1 dark:bg-dark-back-1
  "
    >
      <VStack className="items-center justify-start gap-2">
        <span className="text-2xl">강의 책갈피</span>
      </VStack>
      <div className="overflow-scroll w-full">
        <div className="flex flex-row w-fit gap-4 p-8">
          {pages.data.flatMap((v) => (
            <SearchSingle key={v.course_id} course={v} />
          ))}
          {showMoreButton}
        </div>
      </div>
    </HStack>
  );
}