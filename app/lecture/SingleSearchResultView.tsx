import { useState } from 'react';

import { Course } from '@/api/models/course';
import { StarIcon } from "@/icons";
import Button from '@/components/basic/button';
import { HStack, VStack } from '@/components/basic/stack';
import Link from 'next/link';

import BookmarkToggleButton from '@/components/composite/bookmarkToggleButton';

import styles from './SingleResearchResultView.module.css';

export default function SingleSearchResultView({ course }: { course: Course }) {


  return (
    <Link href={`/lecture/${course.course_id}`}>
      <HStack style={{ justifyContent: 'space-between' }} className={styles.resultBox}>
        <VStack
          className={styles.borderBottom}
          style={{ justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '24px' }}
        >
          <VStack gap="12px">
            <div style={{ background: 'grey', aspectRatio: 1, width: '48px', height: '48px', borderRadius: '24px' }} />
            <HStack gap="4px">
              <span className='text-xl' >{course.name}</span>
              <span className='text-xl' >{course.professor}</span>
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
          <VStack gap="24px">
            <span className='text-xl'  >{course.course_code}</span>
            <span className='text-xl'  >{course.semester}</span>
          </VStack>
          <VStack className={styles.star} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StarIcon width="24px" height="24px" />
            <span className='text-xl' >{course.avg_rating}</span>
          </VStack>
        </VStack>
      </HStack>
    </Link>
  );
}
