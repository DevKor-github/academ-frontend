import Tag from '@/component/basic/tag';
import { HStack, VStack } from '@/component/basic/stack';
import Progress from '@/component/basic/progress';

import Star5 from '@/component/composite/starIndicator';

import { getTagFromCourse } from '@/lib/process/tag';

function RateSummary({ course }: { course: CourseOnly }) {
  const tags = getTagFromCourse(course);

  return (
    <HStack
      className="border-neutral-200 border"
      style={{ borderRadius: '20px', padding: '80px 40px', width: '440px', maxWidth: '100%' }}
    >
      <VStack
        gap="4px"
        style={{
          borderBottom: '1px solid #D4D4D4',
          alignItems: 'end',
          paddingBottom: '20px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          <span className="text-6xl font-semibold">{course.avg_rating.toFixed(1)}</span>
          <span className="text-3xl text-neutral-600"> /5</span>
          <span className="text-3xl text-neutral-400"> ({course.count_comments})</span>
        </span>
        <Star5 rate={course.avg_rating / 5} px={32} />
      </VStack>
      <VStack style={{ flexWrap: 'wrap', justifyContent: 'start' }}>
        {tags.length === 0 ? (
          <span>태그가 없습니다.</span>
        ) : (
          tags.map((t) => (
            <Tag key={t} style={{ margin: '6px 6px 0px 0px' }} className="bg-neutral-100">
              {t}
            </Tag>
          ))
        )}
      </VStack>
    </HStack>
  );
}

interface CriteriaIndicatorProp {
  name: string;
  low: string;
  high: string;
  rate: number;
  style?: React.CSSProperties;
  reverse: boolean;
}

export function CriteriaIndicator({ name, low, high, rate, style, reverse }: CriteriaIndicatorProp) {
  return (
    <HStack className="justify-between w-full gap-4" style={style}>
      <VStack style={{ justifyContent: 'between', alignItems: 'end' }} gap="10px">
        <span className="text-xl">{name}</span>
        <span className="text-2xl font-bold">{rate.toFixed(1)}</span>
      </VStack>
      <HStack
        gap="10px"
        style={{ padding: '20px', borderRadius: '12px', width: '300px' }}
        className="border-neutral-200 border"
      >
        <VStack style={{ justifyContent: 'space-between' }}>
          <Tag>{low}</Tag>
          <Tag>{high}</Tag>
        </VStack>
        <Progress rate={rate / 5} reverse={reverse} />
      </HStack>
    </HStack>
  );
}

function Criteria({ course }: { course: CourseOnly }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 self-center w-fit max-w-full gap-x-8 gap-y-8">
      <CriteriaIndicator name="학습량" low="적음" high="많음" rate={course.avg_r1_amount_of_studying} reverse={true} />
      <CriteriaIndicator name="난이도" low="낮음" high="높음" rate={course.avg_r2_difficulty} reverse={true} />
      <CriteriaIndicator name="전달력" low="나쁨" high="좋음" rate={course.avg_r3_delivery_power} reverse={false} />
      <CriteriaIndicator name="학점" low="낮음" high="높음" rate={course.avg_r4_grading} reverse={false} />
    </div>
  );
}

export default function CommentsSummaryView({ course }: { course: CourseOnly }) {
  return (
    <HStack gap="30px" className="pl-8 pr-8 pb-8" style={{ marginTop: '60px' }}>
      <span className="text-2xl">평가 한눈에 보기</span>

      <VStack
        gap="20px"
        style={{
          rowGap: '20px',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          alignItems: 'center',
          margin: '20px 0px',
        }}
      >
        <RateSummary course={course} />
        <Criteria course={course} />
      </VStack>
    </HStack>
  );
}
