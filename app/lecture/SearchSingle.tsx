'use client';

import { Course } from '@/lib/models/course';
import { StarIcon } from '@/icons';
import Button from '@/components/basic/button';
import { HStack, VStack } from '@/components/basic/stack';
import Link from 'next/link';
import Tag from '@/components/basic/tag';

import BookmarkToggleButton from '@/components/composite/bookmarkToggleButton';

import styles from './SearchSingle.module.css';

import LectureIcon from '@/components/composite/lectureIcon';

import { getTagFromCourse } from '@/lib/process/tag';
import { isBookmark } from '@/lib/api/course';

function Up({ course }: { course: Course & isBookmark }) {
  return (
    <VStack style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <LectureIcon code={course.course_code} />
      <HStack className="items-start text-left w-full pl-2">
        <span className="text-lg" style={{ wordBreak: 'break-all' }}>
          {course.name}
        </span>
        <span className="text-base">{course.professor}</span>
      </HStack>

      <BookmarkToggleButton
        id={course.course_id}
        defaultValue={course.isBookmark}
        onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      />
    </VStack>
  );
}

function Mid({ course }: { course: Course & isBookmark }) {
  return (
    <span
      className={' border-b border-b-neutral-400 text-base flex flex-row flex-grow pt-2 gap-1'}
      style={{ paddingBottom: '24px' }}
    >
      <Tag className=" light:bg-neutral-100 dark:bg-dark-back-6">{course.credit}학점</Tag>
      <Tag className="  light:bg-neutral-100 dark:bg-dark-back-6 ">{course.course_code}</Tag>
      <Tag className="  light:bg-neutral-100 dark:bg-dark-back-6">
        {course.year}-{course.semester}
      </Tag>
    </span>
  );
}
function Down({ course }: { course: Course & isBookmark }) {
  const tags = getTagFromCourse(course);

  return (
    <VStack className={styles.star + ' pt-6 flex-wrap items-center justify-start gap-1'}>
      {tags.length === 0 ? (
        <span className="text-base text-neutral-400">태그 없음</span>
      ) : (
        tags.flatMap((v) => <Tag className=" bg-neutral-100 ">{v}</Tag>)
      )}

      <span className="text-xl flex flex-row items-center justify-end flex-grow">
        {course.count_comments === 0 ? (
          <span className="text-base text-neutral-400">평가 없음</span>
        ) : (
          <>
            <StarIcon />
            {course.avg_rating}/5({course.count_comments})
          </>
        )}
      </span>
    </VStack>
  );
}
export default function SearchSingle({ course }: { course: Course & isBookmark }) {
  return (
    <Link className={styles.resultBox + ' p-6 flex flex-col justify-between'} href={`/lecture/${course.course_id}`}>
      <Up course={course} />
      <Mid course={course} />
      <Down course={course} />
    </Link>
  );
}
