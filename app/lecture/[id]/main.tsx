'use client';

import { HStack, VStack } from '@/components/basic/stack';

import BasicInfoView from './components/basicinfo';
import CommentsView from './components/comments';
import SummaryView from './components/summary';

import { CourseWithBookmark } from '@/lib/models/course';
import Link from 'next/link';

export default function LectureView({ course }: { course: CourseWithBookmark }) {
  if (course.comments.length === 0) {
    return (
      <HStack className="w-full h-full">
        <BasicInfoView course={course} />
        <span className="w-fulltext-center pt-16 pb-8 text-2xl text-center">강의 평이 없습니다.</span>
        <span className="w-fulltext-center pb-16 text-base text-center text-primary-500 underline">
          <Link href={`/lecture/${course.course_id}/write`}>작성하러 가기</Link>
        </span>
      </HStack>
    );
  } else {
    return (
      <HStack className="w-full h-full">
        <BasicInfoView course={course} />
        <SummaryView course={course} />
        <CommentsView course_id={course.course_id} comments={course.comments} />
      </HStack>
    );
  }
}
