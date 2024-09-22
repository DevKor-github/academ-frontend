'use server';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { cache, use } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { LectureIconPath } from '@/component/composite/lectureIcon';

import { ELEM_PER_PAGE } from '@/lib/directive';
import { apiCourseDetail } from '@/lib/api/calls/course';
import ErrorTemplate from '@/lib/template';

import CourseBasicsView from '@/component/view/CourseBasicsView';
import CommentsSummaryView from '@/component/view/CommentsSummaryView';
import { IssueIcon } from '@/component/icon';

const CommentsView = dynamic(() => import('./fetch'), { ssr: false });

function WriteNewMobile({ course_id }: { course_id: number }) {
  const WriteIcon = (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17.1211H19H10Z" fill="white" />
      <path d="M10 17.1211H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M14.5 1.58503C14.8978 1.21044 15.4374 1 16 1C16.2786 1 16.5544 1.05166 16.8118 1.15204C17.0692 1.25242 17.303 1.39955 17.5 1.58503C17.697 1.77051 17.8532 1.9907 17.9598 2.23304C18.0665 2.47538 18.1213 2.73512 18.1213 2.99742C18.1213 3.25973 18.0665 3.51946 17.9598 3.7618C17.8532 4.00414 17.697 4.22433 17.5 4.40981L5 16.1797L1 17.1213L2 13.3549L14.5 1.58503Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <Link
      className="text-white fixed aspect-square bg-primary-500 p-4 bottom-8 right-8 z-20 rounded-full md:hidden"
      href={`/lecture/${course_id}/write`}
    >
      {WriteIcon}
    </Link>
  );
}

function CourseView({ course, totalPage }: { course: CourseOnly; totalPage: number }) {
  return (
    <div className="flex flex-col w-full h-full">
      <CourseBasicsView course={course} />

      {course.count_comments === 0 ? (
        <>
          <div className="flex flex-col justify-center items-center gap-6 h-full min-h-[300px]">
            <IssueIcon />
            <span className="w-fulltext-center text-2xl text-center">강의평이 없습니다.</span>
            <span className="w-fulltext-center text-base text-center text-primary-500 underline">
              <Link href={`/lecture/${course.course_id}/write`}>작성하러 가기</Link>
            </span>
          </div>
        </>
      ) : (
        <>
          <CommentsSummaryView course={course} />
          <CommentsView course_id={course.course_id} totalPage={totalPage} />
        </>
      )}
      <WriteNewMobile course_id={course.course_id} />
    </div>
  );
}

export const generateMetadata = cache(async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {

  const course = await apiCourseDetail({ course_id: Number(params.id), order: 'NEWEST', page: 1 });
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
 
  return {
    title: `${course.data.name} 강의평 - Academ`,
    description: `Academ에서 ${course.data.name}의 강의 평을 확인하세요.`,
    openGraph: {
      images: [LectureIconPath(course.data.course_code), ...previousImages],
    },
  }
});

export default async function LectureFetch({ params: { id } }: { params: { id: string } }) {
  // XXX : this is just for showing basic information, order is **NOT** important - maybe api refactor?
  const course = use(apiCourseDetail({ course_id: Number(id), order: 'NEWEST', page: 1 }));

  if (course.status !== 'SUCCESS') {
    return <ErrorTemplate title={course.statusCode.toString()} subtitle="오류" />;
  }

  const totalPage = Math.ceil(course.data.count_comments / ELEM_PER_PAGE);
  return <CourseView course={course.data} totalPage={totalPage} />;
}
