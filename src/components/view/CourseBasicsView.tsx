import Button from '@/components/basic/button';
import { VStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import LectureIcon from '@/components/composite/lectureIcon';
import { SkeletonDiv, SkeletonSlow } from '@/components/composite/skeleton';
import { WriteIcon } from '@/components/icon';
import Link from 'next/link';
import BookmarkToggleButton from '@/components/composite/bookmarkToggleButton';

function CourseBasicsViewUnsafe(props: {
  fade: boolean;
  write: React.ReactNode;
  lectureIcon: React.ReactNode;
  course_code: React.ReactNode;
  class_number?: React.ReactNode;
  course_id: React.ReactNode;
  year: React.ReactNode;
  semester: React.ReactNode;
  time_location: React.ReactNode;
  name: React.ReactNode;
  count_comments: React.ReactNode;
  bookmarkToggle: React.ReactNode;
  professor: React.ReactNode;
}) {
  return (
    <VStack
      className={` pl-8 pr-8 gap-2 md:gap-6 border-b-black bg-neutral-50 dark:bg-neutral-950`}
      style={{
        paddingTop: '100px',
        paddingBottom: '60px',
        justifyItems: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div className="md:text-5xl text-3xl self-start">{props.lectureIcon}</div>
      <div className="grid basis-8/12 gap-4">
        <VStack
          style={{ alignItems: 'center', flexWrap: 'wrap' }}
          className={`gap-x-4 gap-y-2 md:gap-x-10 w-fit ${props.fade ? 'animate-fade' : ''}`}
        >
          <span className="md:text-3xl text-xl font-semibold break-all break-words">{props.name}</span>
          <div className="flex flex-row gap-x-10 ml-auto">
            <Tag className="bg-primary-100 text-primary-900 opacity-50">강의평 {props.count_comments}개</Tag>
            <div className="hidden md:block">{props.bookmarkToggle}</div>
          </div>
        </VStack>
        <VStack
          style={{ flexWrap: 'wrap' }}
          className={`items-center text-base font-normal gap-x-10 gap-y-4 ${props.fade ? 'animate-fade' : ''}`}
        >
          <span className="md:text-2xl text-sm">{props.professor}</span>
          <div className="flex flex-row flex-wrap text-sm md:text-base text-neutral-600 md:justify-between gap-x-6 gap-y-1">
            {props.class_number ? (
              <span className="self-center">
                {props.course_code} - {props.class_number}
              </span>
            ) : (
              <span className="self-center">{props.course_code}</span>
            )}
            <span className="border-r border-r-neutral-300" />
            <span className="self-center">
              {props.year}-{props.semester}
            </span>
            <span className="hidden md:block border-r border-r-neutral-300" />
            <span className="whitespace-pre-line text-wrap">{props.time_location}</span>
          </div>
        </VStack>
      </div>
      <div className="self-start mt-1 md:hidden">{props.bookmarkToggle}</div>
      <div className="self-end hidden md:block ml-auto">{props.write}</div>
    </VStack>
  );
}

export function CourseBasicsViewLoading() {
  return (
    <CourseBasicsViewUnsafe
      fade={false}
      write={<SkeletonDiv />}
      lectureIcon={<LectureIcon code="" />}
      year={<SkeletonSlow placeholder="0000" />}
      semester={<SkeletonSlow placeholder="0R" />}
      time_location={<SkeletonSlow placeholder="?(?-?)" />}
      name={<SkeletonSlow placeholder="과목 이름" />}
      professor={<SkeletonSlow placeholder="교수명" />}
      count_comments={<SkeletonSlow placeholder="0" />}
      course_code={<SkeletonSlow placeholder="??????" />}
      class_number={<SkeletonSlow placeholder="??" />}
      course_id={<SkeletonSlow placeholder="?" />}
      bookmarkToggle={<div />}
    />
  );
}

export default function CourseBasicsView({ course }: { course: CourseOnly }) {
  return (
    <CourseBasicsViewUnsafe
      fade={true}
      write={
        <Link href={`/lecture/${course.course_id}/write`}>
          <Button
            kind="outline"
            className="flex flex-row gap-2 justify-center items-center !rounded-full px-3 text-primary-500 font-medium"
          >
            <WriteIcon />
            강의평 작성
          </Button>
        </Link>
      }
      lectureIcon={<LectureIcon code={course.course_code} />}
      year={course.year}
      semester={course.semester}
      time_location={course.time_location}
      name={course.name}
      professor={course.professor}
      count_comments={course.count_comments}
      course_code={course.course_code}
      class_number={course.class_number}
      course_id={course.course_id}
      bookmarkToggle={<BookmarkToggleButton id={course.course_id} />}
    />
  );
}
