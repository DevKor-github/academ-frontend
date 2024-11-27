import { notFound } from 'next/navigation';
import { GET } from '@/app/api/get';
import CourseBasicsView from '@/components/view/CourseBasicsView';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CourseBasicsViewById({ params }: Props) {
  const { id: course_id } = await params;

  // TODO refactor
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
