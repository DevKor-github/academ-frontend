import { HStack, VStack } from '@/components/basic/stack';
import Button from '@/components/basic/button';
import CommentView from './comment';
import Link from 'next/link';
import { useState } from 'react';
import Select from '@/components/basic/select';

export default function CommentsView({ course_id, comments }: { course_id?: number; comments: AcdComment[] }) {
  const [order, setOrder] = useState<CommentsOrdering>('NEWEST');
  return (
    <HStack
      className="pl-2 pr-2 md:pl-8 md:pr-8 pt-12 pb-12 h-full transition-all
    light:bg-light-back-1 dark:bg-dark-back-1 gap-6
    "
    >
      <VStack className="items-center justify-between gap-2 mb-2">
        <VStack className="items-center justify-start gap-10">
          <span className="text-2xl">강의평 목록</span>
          {course_id !== undefined && (
            <Link href={`/lecture/${course_id}/write`}>
              <Button> 강의평 작성하기</Button>
            </Link>
          )}
        </VStack>

        <VStack className="items-center justify-end gap-2">
          <Select
            defaultLabel="최신순"
            setValue={setOrder}
            items={
              [
                { value: 'NEWEST', label: '최신순' },
                { value: 'POPEST', label: '인기순' },
              ] as const
            }
          />
        </VStack>
      </VStack>

      {comments?.map((t) => <CommentView key={t.comment_id} comment={t} />)}
    </HStack>
  );
}
