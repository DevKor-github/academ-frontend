import { StarIcon } from '@/icons';
import { HStack, VStack } from '@/components/basic/stack';
import Link from 'next/link';
import Tag from '@/components/basic/tag';

import BookmarkToggleButton from '@/components/composite/bookmarkToggleButton';

import LectureIcon from '@/components/composite/lectureIcon';

import { getTagFromCourse } from '@/lib/process/tag';

function Up({ course }: { course: Course }) {
  return (
    <VStack
      className="border-b border-b-neutral-400 pb-3"
      style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
    >
      <LectureIcon code={course.course_code} />
      <HStack className="items-start text-left w-full pl-2 ">
        <span className="text-lg font-semibold" style={{ wordBreak: 'break-all' }}>
          {course.name}
        </span>
        <span className="text-base">{course.professor}</span>
        <VStack className="justify-between text-xs text-neutral-600 text-justify w-full mt-4">
          <span>{course.course_code}</span>
          <span className="border-r border-r-neutral-400" />
          <span>
            {course.year}-{course.semester}
          </span>
        </VStack>
      </HStack>

      <BookmarkToggleButton id={course.course_id} defaultValue={course.isBookmark} />
    </VStack>
  );
}

function Down({ course }: { course: Course }) {
  const tags = getTagFromCourse(course);

  return (
    <VStack className={'pt-4 flex-wrap items-center justify-start gap-2'}>
      <div className="grid grid-cols-2 gap-1">
        {tags.length === 0 ? (
          <span className="text-base text-neutral-400">태그 없음</span>
        ) : (
          tags.flatMap((v) => <Tag>{v}</Tag>)
        )}
      </div>

      <span className="text-2xl font-semibold flex flex-row justify-end self-end flex-grow gap-1">
        {course.count_comments === 0 ? (
          <span className="text-base font-normal text-neutral-400">평가 없음</span>
        ) : (
          <>
            <span className="text-primary-500">
              <StarIcon />
            </span>
            {course.avg_rating.toFixed(1)}
            <span className="text-neutral-400 text-base font-normal self-end">/5 ({course.count_comments})</span>
          </>
        )}
      </span>
    </VStack>
  );
}

function CoursePreviewBox({ children, href = '' }: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link
      className={`
  transition-all overflow-hidden h-fit w-full rounded-3xl cursor-pointer p-8 flex flex-col justify-between hover:-translate-y-2
  border light:border-base-27 dark:border-base-7 hover:dark:border-primary-500
  light:bg-base-32 hover:light:shadow-xl hover:light:shadow-base-27 
  dark:bg-base-4 hover:dark:shadow-glow-lg hover:dark:shadow-primary-500
  `}
      href={href}
    >
      {children}
    </Link>
  );
}

export function CoursePreviewLoading() {
  return (
    <CoursePreviewBox href="">
      <div className="h-36" />
    </CoursePreviewBox>
  );
}

export default function CoursePreview({ course }: { course: Course }) {
  return (
    <CoursePreviewBox href={`/lecture/${course.course_id}`}>
      <Up course={course} />
      <Down course={course} />
    </CoursePreviewBox>
  );
}
