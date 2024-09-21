'use client';

import { use, useState } from 'react';
import Spinner from '@/components/basic/spinner';
import { apiCourseDetail } from '@/lib/api/calls/course';
import dynamic from 'next/dynamic';

const ErrorTemplate = dynamic(() => import('@/lib/template'), {
  ssr: false,
  loading: () => (
    <div className="w-full p-8 flex flex-row justify-center items-center text-6xl">
      <Spinner />
    </div>
  ),
});

import LectureView from './CourseView';

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
      return <ErrorTemplate title={course.statusCode.toString()} subtitle="로그인이 필요합니다." />;
    }

    return <ErrorTemplate title={course.statusCode.toString()} subtitle="오류" />;
  }

  return <LectureView course={course.data} />;
}
