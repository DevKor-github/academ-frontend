import styles from '../common.module.css';
import { HStack, VStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import { Course } from '@/api/models/course';
import BookmarkToggleButton from '@/components/composite/bookmarkToggleButton';
import Skeleton from '@/components/composite/skeleton';

export default function BasicInfoView({ course }: { course: Course }) {
  
  return (
    <VStack
      className={` pl-8 pr-8 ${styles.borderBottom} bg-neutral-50 dark:bg-neutral-950`}
      style={{
        paddingTop: '160px',
        paddingBottom: '60px',
        justifyItems: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
      gap="24px"
    >
      <div
        style={{
          height: '80px',
          width: '80px',
          aspectRatio: 1,
          borderRadius: '52px',
          background: '#d9d9d9',
        }}
      />
      <HStack gap="10px">
        <VStack gap="10px" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <span className='text-3xl'>{course.name}</span>
          <Tag className="bg-primary-100 text-primary-900 opacity-50">강의평 {course.count_comments}개</Tag>
          <BookmarkToggleButton id={course.course_id} />
        </VStack>
        <VStack gap="20px" style={{ flexWrap: 'wrap' }}>
          <span className='text-lg' >{course.professor}</span>
          <span className='text-lg'>{course.course_code}</span>
          <span className='text-lg'>{course.year}</span>
          <span className='text-lg'>{course.semester}</span>
          <span className='text-lg'>{course.time_location}</span>
        </VStack>
      </HStack>
    </VStack>
  );
}
