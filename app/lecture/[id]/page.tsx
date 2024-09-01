'use client';

import { useEffect, useState } from 'react';

import { Spinner2 } from '@/components/basic/spinner';

import { useApi } from '@/lib/api/builder';

import { apiCourseDetail } from '@/lib/api/course';
import LectureLoading from './loading';

import dynamic from 'next/dynamic';

import { useSessionId } from '@/context/SessionIdContext';

const ErrorTemplate = dynamic(() => import('@/lib/template'), {
  ssr: false, loading: () =>
  (<div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner2 /></div>)
 });
const LectureView = dynamic(() => import('./main'), {
  ssr: false, loading: () =>
  (<div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner2 /></div>)
 });

export default function LectureFetch({ params: { id } }: { params: { id: number } }) {
  const [jwt] = useSessionId();
  const [page, setPage] = useState(1);

  const { loading, response : course} = useApi(apiCourseDetail, { course_id: id, order: 'NEWEST', page }, { token: jwt?.accessToken });

  if (loading) {
    return <div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner2 /></div>;
  }

  return course.status === 'SUCCESS' ? (
    <LectureView course={course.data} />
  ) : (
    <ErrorTemplate title={course.statusCode.toString()} subtitle="오류" />
  );
}
