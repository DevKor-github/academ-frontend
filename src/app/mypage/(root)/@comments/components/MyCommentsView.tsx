'use client';

import Button from '@/components/basic/button';
import { DownIcon } from '@/components/icon';
import { HStack, VStack } from '@/components/basic/stack';
import { MyCommentView } from '@/components/view/CommentView';
import { ELEM_PER_PAGE } from '@/lib/directive';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MyPageComments } from '@/app/mypage/server.util';

interface Props {
  totalCount: number;
}

export default function MyCommentsView({ totalCount }: Props) {
  
  const totalPage = Math.ceil(totalCount / ELEM_PER_PAGE);

  const { isPending, isFetchingNextPage, data: cmt, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['mypage'],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      MyPageComments(pageParam) as Promise<{ data: AcdMyComment[], cursor: number }>,
    initialPageParam: 1,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => lastPage.cursor < totalPage ? lastPage.cursor + 1 : undefined,
    select: (data) => (data.pages ?? []).flatMap((page) => page.data),
  });

  const nextButton =
  hasNextPage ? (
      <div className="self-center">모두 불러왔습니다.</div>
    ) : (
      <div className="w-full pt-6 flex flex-col justify-center items-center">
        <Button onClick={() => fetchNextPage()}>
          <DownIcon />
        </Button>
      </div>
    );

  if (totalPage <= 0) {
    return <MyCommentsWrapper>등록한 강의평이 없습니다.</MyCommentsWrapper>;
  }

  return (
    <MyCommentsWrapper>
      {cmt.map((c) => (
        <MyCommentView key={c.comment_id} comment={c} />
      ))}
      {nextButton}
    </MyCommentsWrapper>
  );
}


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
