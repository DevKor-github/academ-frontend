'use client';

import { useState } from 'react';
import { CommentsWrapper } from '../aux';
import Button from '@/components/basic/button';
import { DownIcon } from '@/components/icon';
import { IsCourse } from '@/types/course.types';
import CommentView from '@/components/view/CommentView';
import { CommentLoadingItems } from '../aux';
import { courseDetailWithComments } from '@/app/api/lecture.api';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { AcdComment, AcdCommentOrdering } from '@/types/comment.types';
import type { Course, CourseOnly } from '@/types/course.types';

interface Props extends ReqCourseRelated {
  totalPage: number;
}

interface CommentsViewProps extends Props {
  order: AcdCommentOrdering;
  setOrder: React.FormEventHandler;
  sessionUserID: number | undefined;
}

function CommentsResults({ course_id, order, totalPage, setOrder, sessionUserID }: CommentsViewProps) {
  const {
    isFetching,
    // isPending,
    isFetchingNextPage,
    data: cmt,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['course_with_comments', course_id, order],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      courseDetailWithComments({ course_id, page: pageParam, order }) satisfies Promise<
        ApiResponse<AcdComment[]> & { cursor: number }
      >,
    initialPageParam: 1,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => (lastPage.cursor < totalPage ? lastPage.cursor + 1 : undefined),
    select: (data) => (data.pages ?? []).flatMap((page) => page.data),
  });

  const nextButton = hasNextPage ? (
    <div className="w-full pt-6 flex flex-col justify-center items-center">
      <Button onClick={() => fetchNextPage()}>
        <DownIcon />
      </Button>
    </div>
  ) : (
    <div className="self-center">모두 불러왔습니다.</div>
  );

  return (
    <CommentsWrapper order={order} handleValue={setOrder}>
      {cmt.map((c) => (
        <CommentView sessionUserID={sessionUserID} key={c.comment_id} comment={c} />
      ))}
      {isFetching || isFetchingNextPage ? <CommentLoadingItems /> : null}
      {nextButton}
    </CommentsWrapper>
  );
}

export default function CommentsView({
  course,
  totalPage,
  sessionUserID,
}: {
  course: Course | CourseOnly;
  totalPage: number;
  sessionUserID: number | undefined;
}) {
  const [order, setOrder] = useState<AcdCommentOrdering>('NEWEST');

  function handleValue(e: React.FormEvent<HTMLInputElement>) {
    setOrder((e.target as HTMLInputElement).value as AcdCommentOrdering);
  }

  return course.count_comments === 0 && IsCourse(course) ? (
    <CommentsResults
      course_id={course.course_id}
      order={order}
      totalPage={totalPage}
      sessionUserID={sessionUserID}
      setOrder={handleValue}
    />
  ) : null;
}
