"use client";

import { apiCourseDetail } from '@/lib/api/search';

import { Course } from '@/lib/models/course';

import LectureView from './main';

import { ApiResponse } from '@/lib/api/builder/backend';
import ErrorTemplate from '@/lib/template';

export default async function Page({ params: { id } }: { params: { id: number } }) {

    const [course, a] :[ Course | null, ApiResponse<Course> ]= await apiCourseDetail({ course_id: id }).then(
      (a) => {
        if (a.status === "SUCCESS") {
          return [(a.data), a];
        }
        else {
          return [null, a];
        }
      })
  
    return <main className='w-full h-full'>
      {course === null ? (
        a.status === "ERROR" ?
          <ErrorTemplate title={a.code.toString()} subtitle={a.message} />
          :
          <ErrorTemplate title="!" subtitle="알 수 없는 오류가 발생했습니다." />
      ) :
        <LectureView course={course} />
      }
    </main>;
}
  
