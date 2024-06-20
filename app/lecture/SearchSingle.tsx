"use client";

import { Course } from '@/lib/models/course';
import { StarIcon } from "@/icons";
import Button from '@/components/basic/button';
import { HStack, VStack } from '@/components/basic/stack';
import Link from 'next/link';

import BookmarkToggleButton from '@/components/composite/bookmarkToggleButton';

import styles from './SearchSingle.module.css';

import LectureIcon from '@/components/composite/lectureIcon';

export default function SearchSingle({ course }: { course: Course }) {

  return (
    <Link href={`/lecture/${course.course_id}`}>
      <HStack style={{ justifyContent: 'space-between' }} className={styles.resultBox}>
        <VStack
          className={styles.borderBottom}
          style={{ justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '24px' }}
        >
          <VStack gap="12px">
            <LectureIcon />
            <HStack className='items-start text-left' gap="4px">
              <span className='text-xl' >{course.name}</span>
              <span className='text-xl' >{course.professor}</span>
              <span className='' >{course.course_code} {course.year} {course.semester}</span>
            </HStack>
          </VStack>
          <Button
            kind="blank"
            onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <BookmarkToggleButton id={course.course_id} />
          </Button>
        </VStack>
        <VStack style={{ justifyContent: 'space-between' }}>
          <VStack className={styles.star} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <span className='text-xl flex flex-row items-center' >
            <StarIcon />{course.avg_rating}/5({course.count_comments})</span>
          </VStack>
        </VStack>
      </HStack>
    </Link>
  );
}
