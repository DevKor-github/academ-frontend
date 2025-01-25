import { Course, CourseOnly } from '@/types/course.types';

export function IsCourse(course: Course | CourseOnly): course is Course {
  // @ts-expect-error intended access
  return course?.comments !== undefined || course?.avg_rating !== undefined;
}
