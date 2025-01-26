import { notFound } from 'next/navigation';
import CourseBasicsView from '@/components/view/CourseBasicsView';
import { courseDetailWithNoAuth } from '@/app/api/lecture.api';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CourseBasicsViewById({ params }: Props) {
  const { id: course_id } = await params;

  // TODO refactor
  // XXX : this is just for showing basic information, order is **NOT** important - maybe api refactor?
  const course = await courseDetailWithNoAuth(Number(course_id));

  if (course.status !== 'SUCCESS') {
    notFound();
  }

  return <CourseBasicsView course={course.data} />;
}
