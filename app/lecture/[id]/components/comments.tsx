import { HStack, VStack } from '@/components/basic/stack';
import { Comment } from '@/api/models/comment';

import CommentView from './comment';
import Link from 'next/link';

export default function CommentsView({ course_id, comments }: { course_id: number;  comments : Comment[]})  {

  return (
    <HStack className='pl-8 pr-8 pt-24 pb-24 bg-neutral-100 dark:bg-neutral-900'>
      <VStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className='text-2xl'>강의평 목록</span>
      </VStack>
      {comments?.length > 0 ? comments?.map((t) => (
        <CommentView key={t.course_id} />
      )): <div><span className='text-2xl text-center w-full'>이 강의는 강의평이 없습니다. <Link href={`/write/${course_id}`}>강의평 남기기</Link></span></div>}
    </HStack>
  );
}
