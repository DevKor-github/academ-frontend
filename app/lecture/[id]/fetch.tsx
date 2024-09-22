'use client';

import { useState } from 'react';

import { HStack, VStack } from '@/component/basic/stack';
import Select from '@/component/basic/select';
import Button from '@/component/basic/button';
import { DownIcon } from '@/component/icon';
import CommentsResults from './results';

function CommentsWrapper({
  children,
  order,
  setOrder,
}: React.PropsWithChildren<{ order: CommentsOrdering; setOrder: SetState<CommentsOrdering> }>) {
  function handleValue(e: React.FormEvent<HTMLInputElement>) {
    setOrder((e.target as HTMLInputElement).value as CommentsOrdering);
  }

  return (
    <HStack className="pl-2 pr-2 md:pl-8 md:pr-8 pt-12 pb-12 h-full transition-all light:bg-base-31 dark:bg-base-2 gap-6">
      <VStack className="items-center justify-between gap-2 mb-2">
        <VStack className="items-center justify-start gap-10">
          <span className="text-2xl">강의평 목록</span>
        </VStack>

        <VStack className="items-center justify-end gap-2">
          <Select
            id="order"
            value={order}
            handleValue={handleValue}
            items={
              [
                { value: 'NEWEST', label: '최신순' },
                { value: 'LIKES_DESC', label: '인기순' },
              ] as const
            }
          />
        </VStack>
      </VStack>
      {children}
    </HStack>
  );
}

export default function CommentsView({ course_id, totalPage }: ReqCourseRelated & { totalPage: number }) {
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<CommentsOrdering>('NEWEST');

  const pages = new Array(page).fill(undefined).map((_, i) => i + 1);

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

  return (
    <CommentsWrapper order={order} setOrder={setOrder}>
      {pages.flatMap((p) => (
        <CommentsResults key={p} order={order} page={p} course_id={course_id} />
      ))}
      {nextButton}
    </CommentsWrapper>
  );
}
