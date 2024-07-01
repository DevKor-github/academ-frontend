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

  const course = useApiCourseDetail({ course_id: id }, jwt);

  if (course === null) {
    return <LectureLoading />;
  }

  return course.status === 'SUCCESS' ? (
    <LectureView course={course.data} />
  ) : (
    <ErrorTemplate title={course.code.toString()} subtitle="오류" />
  );
}
