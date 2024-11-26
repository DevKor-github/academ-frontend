'use server';

import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { GET } from '@/lib/api-server/get';
import { ELEM_PER_PAGE } from '@/lib/directive';

import CommentsView from './fetch';

import { LectureIconPath } from '@/components/composite/lectureIcon';
import CourseBasicsView, { CourseBasicsViewLoading } from '@/components/view/CourseBasicsView';

function WriteNewMobile({ course_id }: { course_id: number }) {
  const WriteIcon = (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17.1211H19H10Z" fill="white" />
      <path d="M10 17.1211H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M14.5 1.58503C14.8978 1.21044 15.4374 1 16 1C16.2786 1 16.5544 1.05166 16.8118 1.15204C17.0692 1.25242 17.303 1.39955 17.5 1.58503C17.697 1.77051 17.8532 1.9907 17.9598 2.23304C18.0665 2.47538 18.1213 2.73512 18.1213 2.99742C18.1213 3.25973 18.0665 3.51946 17.9598 3.7618C17.8532 4.00414 17.697 4.22433 17.5 4.40981L5 16.1797L1 17.1213L2 13.3549L14.5 1.58503Z"
        fill="white"
        stroke="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <Link
      className="animate-fade text-white fixed aspect-square bg-primary-500 p-4 bottom-8 right-8 z-30 rounded-full md:hidden"
      href={`/lecture/${course_id}/write`}
    >
      {WriteIcon}
    </Link>
  );
}

export async function generateMetadata(
  props: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const course = await GET<ReqCourseDetail, CourseOnly | Course>('/api/course/detail')({
    course_id: Number(params.id),
    order: 'NEWEST',
    page: 1,
  });

  if (course.status !== 'SUCCESS') {
    if (course.statusCode === 404) {
      return {
        // TODO
        title: `강의평 - Academ`,
        description: `Academ에서 강의 평가를 확인하세요.`,
      };
    }
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${course.data.name} 강의평 - Academ`,
    description: `Academ에서 ${course.data.name}의 강의 평가를 확인하세요.`,
    openGraph: {
      images: [LectureIconPath(course.data.course_code), ...previousImages],
    },
  };
}

async function CourseBasicsViewById({ course_id }: { course_id: string }) {
  // XXX : this is just for showing basic information, order is **NOT** important - maybe api refactor?
  const course = await GET<ReqCourseDetail, CourseOnly | Course>('/api/course/detail')({
    course_id: Number(course_id),
    order: 'NEWEST',
    page: 1,
  });

  if (course.status !== 'SUCCESS') {
    notFound();
  }

  return <CourseBasicsView course={course.data} />;
}

async function CommentsViewById({ course_id }: { course_id: number }) {
  // XXX : this is just for showing basic information, order is **NOT** important - maybe api refactor?
  const course = await GET<ReqCourseDetail, CourseOnly | Course>('/api/course/detail')({
    course_id: Number(course_id),
    order: 'NEWEST',
    page: 1,
  });

  const totalPage = Math.ceil(course.data.count_comments / ELEM_PER_PAGE);

  return <CommentsView course_id={course_id} totalPage={totalPage} />;
}

export default async function LectureFetch(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <div className="flex flex-col w-full h-full">
      <Suspense fallback={<CourseBasicsViewLoading />}>
        <CourseBasicsViewById course_id={params.id} />
      </Suspense>
      <CommentsViewById course_id={Number(params.id)} />
      <WriteNewMobile course_id={Number(params.id)} />
    </div>
  );
}
