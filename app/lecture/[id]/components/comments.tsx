import { HStack, VStack } from '@/components/basic/stack';
import { Comment } from '@/lib/models/comment';
import Button from '@/components/basic/button';
import CommentView from './comment';

export default function CommentsView({ course_id, comments }: { course_id: number; comments: Comment[] }) {

  return (
    <HStack className='pl-8 pr-8 pt-24 pb-24 h-full bg-neutral-100 dark:bg-neutral-900'>

    <VStack className="items-center justify-between gap-2">

      <VStack className="items-center justify-start gap-2">
        <span className='text-2xl'>강의평 목록</span>
        <Button>작성하기</Button>
      </VStack>

      <VStack className="items-center justify-end gap-2">
        <span className='glex-grow'>등록순</span>
        <span>추천순</span>
        </VStack>
      </VStack>
        
      {comments?.map((t) => <CommentView key={t.comment_id} comment={t} /> )}
    </HStack>
  );
}
