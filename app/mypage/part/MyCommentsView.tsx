'use client';

import { useState, memo } from 'react';

import Button from '@/components/basic/button';
import { DownIcon } from '@/components/icon';

import { HStack, VStack } from '@/components/basic/stack';
import { MyCommentView } from '@/components/view/CommentView';

import { apiMyPageCommentsCount } from '@/lib/api-client/calls/mypage';
import { apiMyPageComments } from '@/lib/api-client/calls/mypage';
import { useApi } from '@/lib/hooks/api';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';
import { lengthOf } from '@/lib/util';
import { ELEM_PER_PAGE } from '@/lib/directive';

function MyCommentsWrapper({ children }: React.PropsWithChildren) {
  return (
    <HStack className="pl-2 pr-2 md:pl-8 md:pr-8 pt-12 pb-12 h-full transition-all light:bg-base-31 dark:bg-base-2 gap-6">
      <VStack className="items-center justify-between gap-2 mb-2">
        <VStack className="items-center justify-start gap-10">
          <span className="text-2xl">강의평 목록</span>
        </VStack>
      </VStack>
      {children}
    </HStack>
  );
}

const ApiMyPageComments = memo(
  function ApiMyPageComments({ page }: ReqPaginated) {
    const [{ instances }] = useAuthTokens();
    const { loading, response: cms } = useApi(instances.doRefresh, apiMyPageComments, { page });

    if (loading) {
      return <div>...</div>;
    }

    if (cms.status !== 'SUCCESS') {
      return <div>오류 발생</div>;
    }

    return cms.data.flatMap((v) => <MyCommentView key={v.course_id} comment={v} />);
  },
  (prev, next) => prev.page === next.page,
);

export default function MyCommentsView() {
  const [{ instances }] = useAuthTokens();

  const { loading, response: totalPageRes } = useApi(instances.doRefresh, apiMyPageCommentsCount, {});
  const [page, setPage] = useState<number>(1);

  if (loading) {
    return <div>...</div>;
  }

  if (totalPageRes.status !== 'SUCCESS') {
    return <div>오류</div>;
  }

  const totalPage = Math.ceil(totalPageRes.data / ELEM_PER_PAGE);
  const pages = lengthOf(page, 1);

  const nextButton =
    page >= totalPage ? (
      <div className="self-center">모두 불러왔습니다.</div>
    ) : (
      <div className="w-full pt-6 flex flex-col justify-center items-center">
        <Button onClick={() => setPage((n) => n + 1)}>
          <DownIcon />
        </Button>
      </div>
    );

  if (totalPage <= 0) {
    return <MyCommentsWrapper>등록한 강의평이 없습니다.</MyCommentsWrapper>;
  }

  return (
    <MyCommentsWrapper>
      {pages.flatMap((p) => (
        <ApiMyPageComments key={p} page={p} />
      ))}
      {nextButton}
    </MyCommentsWrapper>
  );
}
