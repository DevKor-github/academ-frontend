import Tag from '@/components/basic/tag';
import { HStack, VStack } from '@/components/basic/stack';
import Star5 from '@/components/composite/starIndicator';

import { getTagFromCourse } from '@/lib/process/tag';
import Skeleton from '@/components/composite/skeleton';

function RateSummaryUnsafe(props: {
  avg_rating: React.ReactNode;
  count_comments: React.ReactNode;
  star: React.ReactNode;
  tags: React.ReactNode;
}) {
  return (
    <HStack
      className="border-neutral-200 border"
      style={{ borderRadius: '20px', padding: '80px 40px', width: '440px', maxWidth: '100%' }}
    >
      <VStack
        className="gap-x-1 items-end pb-5 mb-5 flex-wrap"
        style={{
          borderBottom: '1px solid #D4D4D4',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          <span className="text-6xl font-semibold">{props.avg_rating}</span>
          <span className="text-3xl text-neutral-600"> /5</span>
          <span className="text-3xl text-neutral-400"> ({props.count_comments})</span>
        </span>
        {props.star}
      </VStack>
      <VStack style={{ flexWrap: 'wrap', justifyContent: 'start' }}>{props.tags}</VStack>
    </HStack>
  );
}

export function RateSummaryLoading() {
  return (
    <RateSummaryUnsafe
      avg_rating={<Skeleton placeholder="?.?" />}
      count_comments={<Skeleton placeholder="?" />}
      star={<Star5 rate={0} px={32} />}
      tags={
        <>
          <Skeleton className="mr-3" placeholder="태그" />
          <Skeleton className="mr-3" placeholder="태그" />
          <Skeleton className="mr-3" placeholder="태그" />
        </>
      }
    />
  );
}

export default function RateSummary({ course }: { course: Course }) {
  const tags = getTagFromCourse(course);

  return (
    <RateSummaryUnsafe
      avg_rating={<span className="animate-fade">{course.avg_rating.toFixed(1)}</span>}
      count_comments={<span className="animate-fade">{course.count_comments}</span>}
      star={<Star5 rate={course.avg_rating / 5} px={32} />}
      tags={
        tags.length === 0 ? (
          <span>태그가 없습니다.</span>
        ) : (
          tags.flatMap((t) => (
            <Tag key={t} style={{ margin: '6px 6px 0px 0px' }} className="bg-neutral-100">
              {t}
            </Tag>
          ))
        )
      }
    />
  );
}
