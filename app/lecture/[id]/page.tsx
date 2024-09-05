'use client';

import { useState } from 'react';

import Spinner from '@/components/basic/spinner';

import { useApi } from '@/lib/api/builder';

import { apiCourseDetail } from '@/lib/api/course';

import dynamic from 'next/dynamic';

import { useSessionId } from '@/context/SessionIdContext';

const ErrorTemplate = dynamic(() => import('@/lib/template'), {
  ssr: false, loading: () =>
  (<div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner /></div>)
 });
const LectureView = dynamic(() => import('./main'), {
  ssr: false, loading: () =>
  (<div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner /></div>)
 });

export default function LectureFetch({ params: { id } }: { params: { id: number } }) {
  const [jwt] = useSessionId();

  // TODO : refactor to use usePagination.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);

  const { loading, response : course} = useApi(apiCourseDetail, { course_id: id, order: 'NEWEST', page }, { token: jwt?.accessToken });

  if (loading) {
    return <div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner /></div>;
  }

  return course.status === 'SUCCESS' ? (
    <LectureView course={course.data} />
  ) : (
    <ErrorTemplate title={course.statusCode.toString()} subtitle="오류" />
  );
}
