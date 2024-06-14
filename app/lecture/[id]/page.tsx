"use client";

import { HStack } from '@/components/basic/stack';

import { apiCourseDetail } from '@/api/search';
import { ColgroupHTMLAttributes, useState } from 'react';

import { useLayoutEffect } from 'react';

import SummaryView from './components/summary';
import CommentsView from './components/comments';
import BasicInfoView from './components/basicinfo';
import { Course } from '@/api/models/course';

import { redirect } from 'next/navigation';


export default function LecturePage({ params: { id } }: { params: { id: number } }) {


  const [course, setCourse] = useState<Course | null>(null);
  

  useLayoutEffect(() =>{
    apiCourseDetail({ course_id: id }).then(
      (a) => {
        if (a.status === "SUCCESS") {
          setCourse(a.data);
        }
        else {
          setCourse(null);
          redirect('/not-found');
        }
      })}, []);


  return ( course === null ? <main></main> : <main>
        <HStack style={{ height: '100%' }}>
          <BasicInfoView course={course} />
          <SummaryView course={course} />
          <CommentsView comments={course.comments}/>
        </HStack>
      </main>
  );
}
