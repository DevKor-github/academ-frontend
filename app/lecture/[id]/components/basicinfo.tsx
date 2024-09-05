import { HStack, VStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import BookmarkToggleButton from '@/components/composite/bookmarkToggleButton';
import LectureIcon from '@/components/composite/lectureIcon';

export default function BasicInfoView({ course }: { course: Course }) {
  return (
    <VStack
      className={` pl-8 pr-8  border-b-black bg-neutral-50 dark:bg-neutral-950`}
      style={{
        paddingTop: '100px',
        paddingBottom: '60px',
        justifyItems: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
      gap="24px"
    >
      <LectureIcon kind="BIG" code={course.course_code} />
      <HStack gap="16px">
        <VStack gap="40px" style={{ alignItems: 'center', flexWrap: 'wrap' }} className="w-fit">
          <span className="text-3xl font-medium">{course.name}</span>
          <Tag className="bg-primary-100 text-primary-900 opacity-50">강의평 {course.count_comments}개</Tag>
          <BookmarkToggleButton defaultValue={course.isBookmark} id={course.course_id} />
        </VStack>
        <VStack style={{ flexWrap: 'wrap' }} className="items-center text-base font-normal gap-10">
          <span className="text-2xl">{course.professor}</span>
          <div className="flex flex-row text-neutral-600 justify-between gap-6">
            <span className="self-center">{course.course_code}</span>
            <span className="border-r border-r-neutral-400" />
            <span className="self-center">
              {course.year}-{course.semester}
            </span>
            <span className="border-r border-r-neutral-400" />
            <span className="whitespace-pre-line">{course.time_location}</span>
          </div>
        </VStack>
      </HStack>
    </VStack>
  );
}
