import { Course } from '@/api/models/course';
import CommentView from './comment';
import { HStack, VStack } from '@/components/basic/stack';
import { Comment } from '@/api/models/comment';

export default function CommentsView({ comments } : {comments : Comment[]})  {

  return (
    <HStack className='pl-8 pr-8 pt-24 pb-8 bg-neutral-100 dark:bg-neutral-900'>
      <VStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className='text-2xl' children="강의평 목록" />
      </VStack>
      {comments?.length > 0 ? comments?.map((t) => (
        <CommentView key={t.course_id} />
      )): <div><span className='text-2xl text-center w-full'>이 강의는 강의평이 없습니다.</span></div>}
    </HStack>
  );
}
