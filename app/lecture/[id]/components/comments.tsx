import { HStack, VStack } from '@/components/basic/stack';
import { Comment } from '@/lib/models/comment';

import CommentView from './comment';
import Link from 'next/link';

export default function CommentsView({ course_id, comments }: { course_id: number;  comments : Comment[]})  {

  return (
    <HStack className='pl-8 pr-8 pt-24 pb-24 h-full bg-neutral-100 dark:bg-neutral-900'>
      <VStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className='text-2xl'>강의평 목록</span>
      </VStack>
      {comments?.map((t) => <CommentView key={t.course_id} /> )}
    </HStack>
  );
}
