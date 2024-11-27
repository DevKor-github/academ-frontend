import Link from 'next/link';
import { IsCourse } from '@/lib/type/IsCourse';
import { courseDetail } from '@/app/api/lecture.api';
import { IssueIcon } from '@/components/icon';
import CommentsSummaryView from '@/components/view/CommentsSummaryView';
import { LoginRequiredView, NoMembershipView } from '@/components/composite/PermissionView';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SummaryPage({ params }: Props) {
  const { id: course_id } = await params;

  // XXX : this is just for showing basic information, order is **NOT** important - maybe api refactor?
  const course = await courseDetail(Number(course_id));

  return course.data.count_comments === 0 ? (
    <div className="flex h-full justify-center">
      <div className="flex flex-col items-center p-4 gap-4 mt-16">
        <IssueIcon />
        <span className="w-full text-2xl text-center">강의평이 없습니다.</span>
        <span className="w-full text-base text-center text-primary-500 underline mt-6">
          <Link href={`/lecture/${course.data.course_id}/write`}>강의평 작성하러 가기</Link>
        </span>
      </div>
    </div>
  ) : IsCourse(course.data) ? (
    <CommentsSummaryView course={course.data} />
  ) : (
    <div className="flex justify-center">
      <div className="flex flex-col p-4 mt-16">
        {
          // TODO check login using cookie
          true ? <LoginRequiredView /> : <NoMembershipView />
        }
      </div>
    </div>
  );
}
