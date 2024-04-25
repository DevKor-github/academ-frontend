import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Course } from '../../models/course';
import { BookmarkIcon } from '../../icons';
import { Typography, HStack, VStack } from '../../components';

import styles from './Lectures.module.css';

export default function SingleSearchResultView({ course }: { course: Course }) {
  const navigate = useNavigate();

  const [bookmarked, setBookmarked] = useState(false);

  const ignore = (x: unknown) => x;
  ignore([bookmarked, setBookmarked]);

  return (
    <HStack className={styles.resultBox} onClick={() => navigate(`/lecture/${course.courseId}`)}>
      <VStack style={{ justifyContent: 'space-between' }}>
        <VStack>
          <div style={{ background: 'grey', aspectRatio: 1, width: '48px', height: '48px', borderRadius: '24px' }} />
          <HStack>
            <Typography variant="t6" children={course.name} />
            <Typography variant="t6" children={course.professor} />
          </HStack>
        </VStack>
        <BookmarkIcon width="24px" height="24px" />
      </VStack>

      <Typography variant="t6" children={course.courseCode} />
      <Typography variant="t6" children={course.semester} />
      {/* <VStack
        gap="20px"
        style={{
          minWidth: 'fit-content',
          alignItems: 'center',
          padding: '0px 16px 0px 0px',
          borderRight: '1px solid #b7b7b7',
        }}
      >
        <VStack
          gap="5px"
          style={{
            minWidth: 'fit-content',
            alignItems: 'center',
          }}
        >
          <StarIcon style={{ width: '24px', height: '24px', aspectRatio: 1, color: '#dc143c', stroke: 'none' }} />
          {course.name}
          <Typography variant="t1" children="5.0" />
        </VStack>
      </VStack> */}
    </HStack>
  );
}
