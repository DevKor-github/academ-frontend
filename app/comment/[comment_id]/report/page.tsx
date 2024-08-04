'use client';

import { useApiStartUpdateComment } from '@/lib/api/course';

import ErrorTemplate from '@/lib/template';
import ReportCommentLoading from './loading';

import dynamic from 'next/dynamic';
import { useSessionId } from '@/context/SessionIdContext';

const ReportComment = dynamic(() => import('./report'), { ssr: false, loading: ReportCommentLoading });

export default function EditPage({ params: { comment_id } }: { params: { comment_id: number } }) {
  const [jwt] = useSessionId();

  const editable = useApiStartUpdateComment({ comment_id }, { token: jwt?.accessToken });

  if (editable === null) {
    return <ReportCommentLoading />;
  }

  return editable.status === 'SUCCESS' && editable.status === 'SUCCESS' && editable.statusCode === 200 ? (
    <ReportComment comment={editable.data} />
  ) : (
    <ErrorTemplate
      title={editable.statusCode.toString()}
      subtitle={'강의평을 신고할 수 없습니다. 다음 메시지와 함께 실패하였습니다: ' + editable.message}
    />
  );
}
