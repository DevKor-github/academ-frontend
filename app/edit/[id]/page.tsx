'use client';

import { useApiCourseDetail, useApiStartUpdateComment } from '@/lib/api/course';

import ErrorTemplate from '@/lib/template';
import EditLoading from './loading';

import dynamic from 'next/dynamic';
import { useSessionId } from '@/context/SessionIdContext';

const EditComment = dynamic(() => import('./edit'), { ssr: false, loading: EditLoading });

export default function EditPage({ params: { id } }: { params: { id: number } }) {
  const [jwt] = useSessionId();

  const editable = useApiStartUpdateComment({ comment_id: id }, jwt);
  const course = useApiCourseDetail({ course_id: id }, jwt);

  if (course === null || editable === null) {
    return <EditLoading />;
  }

  return course.status === 'SUCCESS' && editable.status === 'SUCCESS' && editable.code === 200 ? (
    <EditComment courseName={course.data.name} comment={editable.data} />
  ) : (
    <ErrorTemplate
      title={editable.code.toString()}
      subtitle={'강의평을 작성할 수 없습니다. 다음 메시지와 함께 실패하였습니다: ' + editable.message}
    />
  );
}
