'use client';

import Button from "@/components/basic/button";
import { DownIcon } from "@/icons";
import { apiMyPageComments } from "@/lib/api/mypage";
import { usePagination } from "@/lib/hooks/pagination";
import { useEffect } from "react";
import { useSessionId } from "@/context/SessionIdContext";
import CommentsView from "@/app/lecture/[id]/components/comments";

export default function MyCommentsView() {

  const [jwt] = useSessionId();
  const [pages, fetchThis] = usePagination(apiMyPageComments);

  if (jwt === null) {
    // silent kill
    return <div />;
  }


  useEffect(
    () => {
      fetchThis({page : pages.page + 1}, {token : jwt?.accessToken });
    }
    , []);
  
  if (pages.totalLoadingState === 'bot') {
    return <div />;
  }

  function fetchNext() {
    fetchThis({ page: pages.page + 1 }, { token: jwt?.accessToken });
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
  


  return (
    <>
    <CommentsView comments={pages.data} />
    {nextButton}
    </>
  );
}