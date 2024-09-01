'use client';

import { apiStartUpdateComment } from '@/lib/api/course';
import { useApi } from '@/lib/api/builder';

import ErrorTemplate from '@/lib/template';
import EditLoading from './loading';

import dynamic from 'next/dynamic';
import { useSessionId } from '@/context/SessionIdContext';

const EditComment = dynamic(() => import('./edit'), { ssr: false, loading: EditLoading });

export default function EditPage({ params: { comment_id } }: { params: { comment_id: number } }) {
  const [jwt] = useSessionId();

  const { loading, response : editable } = useApi(apiStartUpdateComment, { comment_id }, { token: jwt?.accessToken });

  if (loading) {
    return <EditLoading />;
  }

  return editable.status === 'SUCCESS' && editable.status === 'SUCCESS' && editable.statusCode === 200 ? (
    <EditComment courseName={editable.data.name} comment={editable.data} />
  ) : (
    <ErrorTemplate
      title={editable.statusCode.toString()}
      subtitle={'강의평을 작성할 수 없습니다. 다음 메시지와 함께 실패하였습니다: ' + editable.message}
    />
  );
}
