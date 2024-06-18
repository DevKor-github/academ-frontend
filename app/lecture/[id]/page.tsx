"use client";

import { apiCourseDetail } from '@/lib/api/search';
import { useState, useEffect } from 'react';

import { Course } from '@/lib/models/course';

import LectureLoading from './loading';
import LectureView from './lecture';
import LectureError from './err';

export default function LecturePage({ params: { id } }: { params: { id: number } }) {

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiCourseDetail({ course_id: id }).then(
      (a) => {
        if (a.status === "SUCCESS") {
          setCourse(a.data);
        }
        else {
          setCourse(null);
        }
        setLoading(false);
      })
  });

  if (loading) {
    return <main className='w-full h-full'><LectureLoading /></main>
  }

  return  <main className='w-full h-full'>
      {course === null ? <LectureError /> :
        <LectureView course={course} />
      }
    </main>


}
