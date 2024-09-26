import { CourseBasicsViewLoading } from '@/component/view/CourseBasicsView';
import { CommentLoadingItems } from './aux';
import { CommentsSummaryViewLoading } from '@/component/view/CommentsSummaryView';
import { CommentsWrapper } from './aux';

export default function LectureIdPageLoading() {
  return (
    <div className="flex flex-col w-full h-full">
      <CourseBasicsViewLoading />
    </div>
  );
}
