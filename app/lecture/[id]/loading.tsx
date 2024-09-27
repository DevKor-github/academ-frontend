import { CourseBasicsViewLoading } from '@/components/view/CourseBasicsView';
import { CommentsSummaryViewLoading } from '@/components/view/CommentsSummaryView';
import { CommentLoadingItems, CommentsWrapper } from './aux';
import { memo } from 'react';

export const LectureIdPageBotLoading = memo(function LectureIdPageBotLoading() {
  return (
    <>
      <CommentsSummaryViewLoading />
      <CommentsWrapper order={'NEWEST'} handleValue={undefined}>
        <CommentLoadingItems />
      </CommentsWrapper>
    </>
  );
}, () => true);

export default function LectureIdPageLoading() {
  return (
    <div className="flex flex-col w-full h-full">
      <CourseBasicsViewLoading />
      <LectureIdPageBotLoading />
    </div>
  );
}
