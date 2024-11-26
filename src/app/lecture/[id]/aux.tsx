import { memo } from 'react';

import { CommentViewLoading } from '@/components/view/CommentView';
import { CommentsSummaryViewLoading } from '@/components/view/CommentsSummaryView';

import { HStack, VStack } from '@/components/basic/stack';
import Select from '@/components/basic/select';

export function CommentsWrapper({
  children,
  order,
  handleValue,
}: React.PropsWithChildren<{ order: CommentsOrdering; handleValue?: React.FormEventHandler }>) {
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

export function CommentLoadingItems() {
  return (
    <>
      <div className="animate-pulse-[0ms]">
        <CommentViewLoading />
      </div>
      <div className="animate-pulse-[-100ms]">
        <CommentViewLoading />
      </div>
      <div className="animate-pulse-[-200ms]">
        <CommentViewLoading />
      </div>
      <div className="animate-pulse-[-300ms]">
        <CommentViewLoading />
      </div>
      <div className="animate-pulse-[-400ms]">
        <CommentViewLoading />
      </div>
      <div className="animate-pulse-[-500ms]">
        <CommentViewLoading />
      </div>
      <div className="animate-pulse-[-600ms]">
        <CommentViewLoading />
      </div>
      <div className="animate-pulse-[-700ms]">
        <CommentViewLoading />
      </div>
      <div className="animate-pulse-[-800ms]">
        <CommentViewLoading />
      </div>
      <div className="animate-pulse-[-900ms]">
        <CommentViewLoading />
      </div>
    </>
  );
}

export const LectureIdPageBotLoading = memo(
  function LectureIdPageBotLoading() {
    return (
      <>
        <CommentsSummaryViewLoading />
        <CommentsWrapper order={'NEWEST'} handleValue={undefined}>
          <CommentLoadingItems />
        </CommentsWrapper>
      </>
    );
  },
  () => true,
);
