"use client";

import { HStack } from '@/components/basic/stack';

import { apiCourseDetail } from '@/api/search';
import { useState, useLayoutEffect } from 'react';

import { useRouter } from 'next/navigation';

import BasicInfoView from './components/basicinfo';
import CommentsView from './components/comments';
import SummaryView from './components/summary';

import { Course } from '@/api/models/course';

export default function LecturePage({ params: { id } }: { params: { id: number } }) {


  const [course, setCourse] = useState<Course | null>(null);
  
  const route = useRouter();

  useLayoutEffect(() =>{
    apiCourseDetail({ course_id: id }).then(
      (a) => {
        if (a.status === "SUCCESS") {
          setCourse(a.data);
        }
        else {
          route.replace('/lecture/error-404');
        }
      }).catch(() => {
        route.replace('/lecture/error-404');
      })});


  return ( course === null ? <main></main> : <main>
        <HStack style={{ height: '100%' }}>
          <BasicInfoView course={course} />
          <SummaryView course={course} />
      <CommentsView course_id={course.course_id} comments={course.comments}/>
        </HStack>
      </main>
  );
}
