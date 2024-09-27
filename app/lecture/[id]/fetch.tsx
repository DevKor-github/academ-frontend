'use client';

import Link from 'next/link';
import { memo, useState } from 'react';

import { CommentsWrapper } from './aux';
import Button from '@/components/basic/button';
import { DownIcon } from '@/components/icon';
import { IssueIcon } from '@/components/icon';
import CommentsSummaryView from '@/components/view/CommentsSummaryView';

import { useApi } from '@/lib/hooks/api';
import { apiCourseDetail } from '@/lib/api-client/calls/course';
import { IsCourse } from '@/lib/type/IsCourse';
import { NoMembershipView } from '@/components/composite/PermissionView';

import CommentView from '@/components/view/CommentView';
import { CommentLoadingItems } from './aux';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';

const CommentsResults = memo(function CommentsResults({ course_id, order, page }: ReqCourseDetail) {
  const [{ instances }] = useAuthTokens();
  const { loading, response } = useApi(instances.refreshFirst, apiCourseDetail, { course_id, order, page });

  if (loading) {
    return <CommentLoadingItems />;
  }

  if (response.status !== 'SUCCESS') {
    return <div>발생해서 오류가 발생했습니다.</div>;
  }

  if (!IsCourse(response.data)) {
    return <NoMembershipView />;
  }

  return response.data.comments.flatMap((comment) => (
    <div key={comment.comment_id} className="animate-fade">
      <CommentView key={comment.comment_id} comment={comment} />
    </div>
  ));
});

export default function CommentsView({ course_id, totalPage }: ReqCourseRelated & { totalPage: number }) {
  const [{ instances }] = useAuthTokens();
  const { refreshFirst } = instances;
  // arbitrary call
  const { loading, response: course } = useApi(refreshFirst, apiCourseDetail, {
    course_id: course_id,
    order: 'NEWEST',
    page: 1,
  });
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<CommentsOrdering>('NEWEST');

  function handleValue(e: React.FormEvent<HTMLInputElement>) {
    setOrder((e.target as HTMLInputElement).value as CommentsOrdering);
  }

  if (loading) {
    // TODO : use proper loading screen later
    return <div />;
  }

  if (course.status !== 'SUCCESS') {
    return <NoMembershipView />;
  }

  const pages = new Array(page).fill(undefined).map((_, i) => i + 1);

  const nextButton =
    page >= totalPage ? (
      <div className="self-center">모두 불러왔습니다.</div>
    ) : (
      <div className="w-full pt-6 flex flex-col justify-center items-center">
        <Button onClick={() => setPage((n) => n + 1)}>
          <DownIcon />
        </Button>
      </div>
    );

  return course.data.count_comments === 0 ? (
    <>
      <div className="flex flex-col justify-center items-center gap-6 h-full min-h-[300px]">
        <IssueIcon />
        <span className="w-fulltext-center text-2xl text-center">강의평이 없습니다.</span>
        <span className="w-fulltext-center text-base text-center text-primary-500 underline">
          <Link href={`/lecture/${course.data.course_id}/write`}>작성하러 가기</Link>
        </span>
      </div>
    </>
  ) : IsCourse(course.data) ? (
    <>
      <CommentsSummaryView course={course.data} />
      <CommentsWrapper order={order} handleValue={handleValue}>
        {pages.flatMap((p) => (
          <CommentsResults key={p} order={order} page={p} course_id={course_id} />
        ))}
        {nextButton}
      </CommentsWrapper>
    </>
  ) : (
    <NoMembershipView />
  );
}
