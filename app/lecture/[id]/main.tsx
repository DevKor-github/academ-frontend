'use client';

import { HStack } from '@/components/basic/stack';

import BasicInfoView from './components/basicinfo';
import CommentsView from './components/comments';
import SummaryView from './components/summary';

import Link from 'next/link';
import { IssueIcon } from '@/icons';

function WriteNewMobile({ course_id } : {course_id : number}) {
  return (<Link className='fixed aspect-square bg-primary-500 p-4 bottom-8 right-8 z-20 rounded-full md:hidden' href={`/lecture/${course_id}/write`}>
   …
  </Link>)
}

export default function LectureView({ course }: { course: Course }) {
  if (course.comments.length === 0) {
    return (
      <HStack className="w-full h-full">
        <BasicInfoView course={course} />
        <div className="flex flex-col justify-center items-center gap-6 h-full min-h-[300px]">
          <IssueIcon />
          <span className="w-fulltext-center text-2xl text-center">강의평이 없습니다.</span>
          <span className="w-fulltext-center text-base text-center text-primary-500 underline">
            <Link href={`/lecture/${course.course_id}/write`}>작성하러 가기</Link>
          </span>
        </div>
      </HStack>
    );
  } else {
    return (
      <HStack className="w-full h-full">
        <BasicInfoView course={course} />
        <SummaryView course={course} />
        <CommentsView course_id={course.course_id} comments={course.comments} />
        <WriteNewMobile course_id={course.course_id} />
      </HStack>
    );
  }
}
