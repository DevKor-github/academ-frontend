import { useState } from 'react';

import { Course } from '../../models/course';
import { BookmarkIcon, StarIcon } from '../../icons';
import { A, Typography, HStack, VStack, Button } from '../../components';

import styles from './SingleResearchResultView.module.css';

export default function SingleSearchResultView({ course }: { course: Course }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <A abstract href={`/lecture/${course.course_id}`}>
      <HStack style={{ justifyContent: 'space-between' }} className={styles.resultBox}>
        <VStack
          className={styles.borderBottom}
          style={{ justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '24px' }}
        >
          <VStack gap="12px">
            <div style={{ background: 'grey', aspectRatio: 1, width: '48px', height: '48px', borderRadius: '24px' }} />
            <HStack gap="4px">
              <Typography variant="t4" children={course.name} />
              <Typography variant="t5" children={course.professor} />
            </HStack>
          </VStack>
          <Button
            className={`${styles.bookmarkWrapper} ${bookmarked ? styles.on : ''}`}
            kind="blank"
            onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
              event.preventDefault();
              event.stopPropagation();
              setBookmarked(!bookmarked);
            }}
          >
            <BookmarkIcon width="24px" height="24px" />
          </Button>
        </VStack>
        <VStack style={{ justifyContent: 'space-between' }}>
          <VStack gap="24px">
            <Typography variant="t6" children={course.course_code} />
            <Typography variant="t6" children={course.semester} />
          </VStack>
          <VStack className={styles.star} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <StarIcon width="24px" height="24px" />
            <Typography variant="t2" children={course.avg_rating} />
          </VStack>
        </VStack>
      </HStack>
    </A>
  );
}
