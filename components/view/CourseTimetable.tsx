import { RightIcon, StarIcon } from '@/components/icon';
import { HStack, VStack } from '@/components/basic/stack';
import Link from 'next/link';

import BookmarkToggleButton from '@/components/composite/bookmarkToggleButton';

import LectureIcon from '@/components/composite/lectureIcon';

import { IsCourse } from '@/lib/type/IsCourse';
import Button from '../basic/button';

interface CourseProps {
  timeLocation: string;
}

const CourseTimeLocation: React.FC<CourseProps> = ({ timeLocation }) => {
  // '호'를 기준으로 나누고 마지막 '호'를 다시 붙여 배열로 반환
  const lines = timeLocation
    .split('호')
    .map((part, index, array) => (index < array.length - 1 ? `${part}호` : part.trim()));

  return (
    <div className="flex flex-col">
      {lines
        .filter((line) => line) // 빈 줄 제외
        .map((line, index) => (
          <span key={index}>{line}</span>
        ))}
    </div>
  );
};

function Up({ course }: { course: Course | CourseOnly }) {
  return (
    <HStack className="border-b border-b-neutral-200 pb-3">
      <VStack style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <LectureIcon code={course.course_code} />
        <HStack className="items-start text-left w-full pl-2 ">
          <span className="text-lg font-semibold text-pretty" style={{ wordBreak: 'break-all' }}>
            {course.name}
          </span>
          <span className="text-base">{course.professor}</span>
        </HStack>
        <BookmarkToggleButton id={course.course_id} defaultValue={course.isBookmark} />
      </VStack>
      <VStack className="justify-between text-xs text-neutral-600 text-justify w-full mt-4 items-center">
        {course.class_number == '' ? (
          <span>{course.course_code}</span>
        ) : (
          <span>
            {course.course_code} ({course.class_number})
          </span>
        )}
        <span className="h-6 w-px bg-neutral-200" />
        <CourseTimeLocation timeLocation={course.time_location} />
        <span className="h-6 w-px bg-neutral-200" />
        <span>
          {course.year}-{course.semester}
        </span>
      </VStack>
    </HStack>
  );
}

function Down({ course, href }: { course: Course | CourseOnly; href: string }) {
  if (!IsCourse(course)) {
    return (
      <HStack className={'pt-4 flex-wrap items-center justify-start gap-2'}>
        <span className="text-2xl font-semibold flex flex-row justify-end flex-grow gap-1 self-end">
          {course.count_comments === 0 ? (
            <span className="text-base font-normal text-neutral-400">평가 없음</span>
          ) : (
            <>
              <span className="text-primary-500">
                <StarIcon />
              </span>
              <span className="text-base-4 text-base font-normal self-end">평가 {course.count_comments}개</span>
            </>
          )}
        </span>
        <VStack className={'flex-wrap items-center justify-between w-full gap-2 pt-2'}>
          <Button
            kind="filled"
            className="px-5 py-1 rounded-full bg-neutral-100 text-neutral-400 text-xs justify-center items-center"
          >
            <Link href={href}>
              강의평 확인
              <RightIcon />
            </Link>
          </Button>
          <Button kind="filled" className="px-5 py-1 rounded-full bg-[#dc143c] text-xs justify-center items-center">
            시간표에 추가
          </Button>
        </VStack>
      </HStack>
    );
  }

  return (
    <HStack className={'pt-4 flex-wrap items-center justify-start gap-2'}>
      <span className="text-2xl font-semibold flex flex-row justify-start self-start flex-grow gap-1">
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
      <VStack className={'flex-wrap items-center justify-between w-full gap-2 pt-2'}>
        <Button
          kind="filled"
          className="px-5 py-1 rounded-full bg-neutral-100 text-neutral-400 text-xs justify-center items-center"
        >
          <Link href={href}>
            강의평 확인
            <RightIcon />
          </Link>
        </Button>
        <Button kind="filled" className="px-5 py-1 rounded-full bg-[#dc143c] text-xs justify-center items-center">
          시간표에 추가
        </Button>
      </VStack>
    </HStack>
  );
}

function CoursePreviewBox({ children }: React.PropsWithChildren) {
  return (
    <div
      className={`
  transition-all overflow-hidden h-fit w-full min-w-80 rounded-3xl cursor-pointer p-8 flex flex-col justify-between hover:-translate-y-2
  border light:border-base-27 dark:border-base-7 hover:dark:border-primary-500
  light:bg-base-32 hover:light:shadow-xl hover:light:shadow-base-27 
  dark:bg-base-4 hover:dark:shadow-glow-lg hover:dark:shadow-primary-500
  `}
    >
      {children}
    </div>
  );
}

export function CourseTimetableLoading() {
  return (
    <CoursePreviewBox>
      <div className="h-36" />
    </CoursePreviewBox>
  );
}

export default function CourseTimetable({ course }: { course: Course | CourseOnly }) {
  return (
    <CoursePreviewBox>
      <Up course={course} />
      <Down course={course} href={`/lecture/${course.course_id}`} />
    </CoursePreviewBox>
  );
}
