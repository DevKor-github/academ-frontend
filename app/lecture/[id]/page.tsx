'use client';

import { Course } from '@/lib/models/course';
import { useEffect, useState } from 'react';

import { useApiCourseDetail } from '@/lib/api/course';
import LectureLoading from './loading';

import dynamic from 'next/dynamic';

import { useSessionId } from '@/context/SessionIdContext';

const ErrorTemplate = dynamic(() => import('@/lib/template'), { ssr: false, loading: LectureLoading });
const LectureView = dynamic(() => import('./main'), { ssr: false, loading: LectureLoading });

export default function LectureFetch({ params: { id } }: { params: { id: number } }) {
  const [jwt] = useSessionId();
  const [page, setPage] = useState(1);

  const course = useApiCourseDetail({ course_id: id, order: 'NEWEST', page }, { token: jwt?.accessToken });

  if (course === null) {
    return <LectureLoading />;
  }

  return course.status === 'SUCCESS' ? (
    <LectureView course={course.data} />
  ) : (
    <ErrorTemplate title={course.statusCode.toString()} subtitle="오류" />
  );
}
