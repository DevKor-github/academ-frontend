'use client';

import Link from 'next/link';
import { IsCourse } from '@/types/course.types';
import { courseDetail } from '@/app/api/lecture.api';
import { IssueIcon } from '@/components/icon';
import CommentsSummaryView from '@/components/view/CommentsSummaryView';
import { LoginRequiredView, NoMembershipView } from '@/components/composite/PermissionView';
import { useQuery } from '@tanstack/react-query';
import { IsLoggedIn } from '@/app/api/mypage.api';

interface Props {
  course_id: string;
}

export default function SummaryPage({ course_id }: Props) {

  // XXX : this is just for showing basic information, order is **NOT** important - maybe api refactor?
  // TODO use centralized service for query key management
  const { data: course } = useQuery({
    queryKey: ['course_detail_without_comments', course_id],
    queryFn: () => courseDetail(Number(course_id)),
  })

  const { data: isLoggedIn } = useQuery({
    queryKey: ['isLoggedIn'],
    queryFn: async () => IsLoggedIn(),
  });

  if (course === undefined || isLoggedIn === undefined) {
    return null;
  }

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
          isLoggedIn ?  <NoMembershipView /> : <LoginRequiredView /> 
        }
      </div>
    </div>
  );
}
