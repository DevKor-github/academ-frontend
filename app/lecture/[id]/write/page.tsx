'use client';

import { apiStartNewComment } from '@/lib/api/course';
import { useApi } from '@/lib/api/builder';

import ErrorTemplate from '@/lib/template';
import WriteLoading from './loading';

import dynamic from 'next/dynamic';

import { useSessionId } from '@/context/SessionIdContext';

const WriteComment = dynamic(() => import('./write'), { ssr: false, loading: WriteLoading });

export default function WritePage({ params: { id } }: { params: { id: number } }) {
  const [jwt] = useSessionId();

  const { loading, response: writable } = useApi(apiStartNewComment, { course_id: id }, { token: jwt?.accessToken });

  if (loading) {
    return <WriteLoading />;
  }

  return writable.status === 'SUCCESS' && writable.status === 'SUCCESS' && writable.statusCode === 200 ? (
    <WriteComment course={writable.data} />
  ) : (
    <ErrorTemplate
      title={writable.statusCode.toString()}
      subtitle={`강의평을 작성할 수 없습니다.
        ${writable.message}`}
    />
  );
}
