'use client';

import { memo } from 'react';
import { apiCourseDetail } from '@/lib/api/calls/course';

import CommentView from '@/component/view/CommentView';
import { useApi } from '@/lib/hooks/api';
import { IsCourse } from '@/lib/type/IsCourse';

const CommentsResults = memo(
  function CommentsResults({ course_id, order, page }: ReqCourseDetail) {
    const { loading, response } = useApi(apiCourseDetail, { course_id, order, page });

    if (loading) {
      return <div>불러오는 중</div>;
    }

    if (response.status !== 'SUCCESS') {
      return <div>오류가 발생했습니다.</div>;
    }

    if (!IsCourse(response.data)) {
      return <div>TODO 열람권을 사거나 로그인하세요.</div>
    }

    return response.data.comments.flatMap((comment) => (
      <div key={comment.comment_id} className="animate-fade">
        <CommentView key={comment.comment_id} comment={comment} />
      </div>
    ));
  },

  (prev, next) => {
    return prev.course_id === next.course_id && prev.order === next.order && prev.page === next.page;
  },
);

export default CommentsResults;
