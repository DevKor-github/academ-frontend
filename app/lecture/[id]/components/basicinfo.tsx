import { HStack, VStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import BookmarkToggleButton from '@/components/composite/bookmarkToggleButton';
import LectureIcon from '@/components/composite/lectureIcon';
import Skeleton from '@/components/composite/skeleton';

function BasicInfoViewUnSafe(props: {
  lectureIcon: React.ReactNode;
  course_code: React.ReactNode;
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
      <div className='text-5xl'>
        {props.lectureIcon}
      </div>
      <HStack gap="16px">
        <VStack gap="40px" style={{ alignItems: 'center', flexWrap: 'wrap' }} className="w-fit animate-fade">
          <span className="text-3xl font-medium">{props.name}</span>
          <Tag className="bg-primary-100 text-primary-900 opacity-50">강의평 {props.count_comments}개</Tag>
          {props.bookmarkToggle}
        </VStack>
        <VStack style={{ flexWrap: 'wrap' }} className="items-center text-base font-normal gap-10 animate-fade">
          <span className="text-2xl">{props.professor}</span>
          <div className="flex flex-row text-neutral-600 justify-between gap-6">
            <span className="self-center">{props.course_code}</span>
            <span className="border-r border-r-neutral-400" />
            <span className="self-center">
              {props.year}-{props.semester}
            </span>
            <span className="border-r border-r-neutral-400" />
            <span className="whitespace-pre-line">{props.time_location}</span>
          </div>
        </VStack>
      </HStack>
    </VStack>
  );
}

export function BasicInfoViewLoading() {
  return (<BasicInfoViewUnSafe
    lectureIcon={<LectureIcon code='' />}
    year={<Skeleton placeholder='0000' />}
    semester={<Skeleton placeholder='0R' />}
    time_location={<Skeleton placeholder='?(?-?)' />}
    name={<Skeleton placeholder='과목 이름' />}
    professor={<Skeleton placeholder='교수명' />}
    count_comments={<Skeleton placeholder='0' />}
    course_code={<Skeleton placeholder='??????' />}
    course_id={<Skeleton placeholder='?' />}
    bookmarkToggle={<div />}
  />);
};

export default function BasicInfoView({ course }: { course: CourseOnly }) {
  return (<BasicInfoViewUnSafe
    lectureIcon={<LectureIcon code={course.course_code} />}
    year={course.year}
    semester={course.semester}
    time_location={course.time_location}
    name={course.name}
    professor={course.professor}
    count_comments={course.count_comments}
    course_code={course.course_code}
    course_id={course.course_id}
    bookmarkToggle={<BookmarkToggleButton defaultValue={course.isBookmark} id={course.course_id} />}
  />);
}
