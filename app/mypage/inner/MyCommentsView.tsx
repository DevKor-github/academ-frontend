'use client';

import { HStack, VStack } from "@/components/basic/stack";
import SearchSingle from "@/app/lecture/SearchSingle";

import { apiMyPageComments } from "@/lib/api/mypage";
import { usePagination } from "@/lib/hooks/pagination";
import { useEffect } from "react";
import { useSessionId } from "@/context/SessionIdContext";
import CommentsView from "@/app/lecture/[id]/components/comments";

export default function MyCommentsView() {

  const [jwt] = useSessionId();
  const [pages, fetchThis] = usePagination(apiMyPageComments);

  useEffect(
    () => {
      fetchThis({page : pages.page + 1}, {token : jwt?.accessToken });
    }
    , []);
  
  if (pages.neverLoaded) {
    return <div />;
  }

  return (<CommentsView comments={pages.data} />
  );
}