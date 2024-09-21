'use client';

import { use, useState } from 'react';
import Spinner from '@/components/basic/spinner';
import { apiCourseDetail } from '@/lib/api/calls/course';
import dynamic from 'next/dynamic';
import Button from '@/components/basic/button';

const ErrorTemplate = dynamic(() => import('@/lib/template'), {
  ssr: false,
  loading: () => (
    <div className="w-full p-8 flex flex-row justify-center items-center text-6xl">
      <Spinner />
    </div>
  ),
});

import LectureView from './CourseView';
import Link from 'next/link';

// function LectureWithOrder({ order }: { order: AcdCommentOrdering }) {

//   const p = usePagination(api);

//   return (
//     <div />
//   );
// }

export default function LectureFetch({ params: { id } }: { params: { id: number } }) {
  // TODO : refactor to use usePagination.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);

  // const { loading, response: course } = useApi(
  //   apiCourseDetail,
  //   { course_id: id, order: 'NEWEST', page },
  //   { token: jwt?.accessToken },
  // );

  // if (loading) {
  //   return (
  //     <LectureLoading />
  //   );
  // }

  const course = use(apiCourseDetail({ course_id: id, order: 'NEWEST', page }));

  if (course.status !== 'SUCCESS') {
    if (course.statusCode === 401) {
      return (
        <div
          className="md:p-8 p-2 w-full min-h-full flex flex-col gap-12
  justify-center
  items-center
  [&>h3]:font-bold
  [&>h3]:text-3xl"
        >
          <h3>이 페이지를 보려면 로그인해야 합니다.</h3>
          <Link href="/login">
            <Button>로그인</Button>
          </Link>
        </div>
      );
    }

    return <ErrorTemplate title={course.statusCode.toString()} subtitle="오류" />;
  }

  return <LectureView course={course.data} />;
}
