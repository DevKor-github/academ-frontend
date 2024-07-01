import { StarIcon } from '@/icons';
import Tag from '@/components/basic/tag';
import { HStack, VStack } from '@/components/basic/stack';
import { Course } from '@/lib/models/course';
import Progress from '@/components/basic/progress';

import Star5 from '@/components/composite/starIndicator';

import { getTagFromCourse } from '@/lib/process/tag';

function RateSummary({ course }: { course: Course }) {
  const tags = getTagFromCourse(course);

  return (
    <HStack
      className="border-neutral-200 border"
      style={{ borderRadius: '20px', padding: '80px 40px', width: '480px', maxWidth: '100%' }}
    >
      <VStack
        gap="4px"
        style={{
          borderBottom: '1px solid var(--dbdbdb)',
          alignItems: 'end',
          paddingBottom: '20px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          <span className="text-6xl font-bold">{course.avg_rating}</span>
          <span className="text-4xl" style={{ color: 'grey' }}>
            {' '}
            /5
          </span>
          <span className="text-4xl" style={{ color: 'grey' }}>
            {' '}
            ({course.count_comments})
          </span>
        </span>
        <Star5 rate={course.avg_rating / 5} px={32} />
      </VStack>
      <VStack style={{ flexWrap: 'wrap', justifyContent: 'start' }}>
        {tags.length === 0 ? (
          <span>태그가 없습니다.</span>
        ) : (
          tags.map((t) => (
            <Tag key={t} style={{ margin: '6px 6px 0px 0px' }}>
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
}

export function CriteriaIndicator({ name, low, high, rate, style }: CriteriaIndicatorProp) {
  return (
    <VStack className="justify-between w-full" style={style}>
      <VStack style={{ justifyContent: 'between', alignItems: 'center' }} gap="8px">
        <span className="text-xl">{name}</span>
        <span className="text-xl font-bold">{rate}</span>
      </VStack>
      <HStack
        gap="10px"
        style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--d4d4d4)', width: '300px' }}
      >
        <VStack style={{ justifyContent: 'space-between' }}>
          <Tag className="bg-neutral-100">{low}</Tag>
          <Tag className="bg-neutral-100">{high}</Tag>
        </VStack>
        <Progress rate={rate / 5} />
      </HStack>
    </VStack>
  );
}

function Criteria({ course }: { course: Course }) {
  return (
    <HStack
      className="border-neutral-200 border"
      style={{ borderRadius: '20px', padding: '80px 40px', width: '480px', maxWidth: '100%' }}
    >
      <CriteriaIndicator name="학습량" low="1" high="5" rate={course.avg_r1_amount_of_studying} />
      <CriteriaIndicator name="성적" low="낮음" high="높음" rate={course.avg_r2_difficulty} />
      <CriteriaIndicator name="강의력" low="나쁨" high="좋음" rate={course.avg_r3_delivery_power} />
      <CriteriaIndicator name="난이도" low="낮음" high="높음" rate={course.avg_r4_grading} />
    </HStack>
  );
}

export default function SummaryView({ course }: { course: Course }) {
  return (
    <HStack gap="30px" className="pl-8 pr-8 pb-8" style={{ marginTop: '160px' }}>
      <span className="text-2xl">평가 한눈에 보기</span>

      <VStack
        gap="20px"
        style={{
          rowGap: '20px',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          alignItems: 'start',
          margin: '20px 0px',
        }}
      >
        <RateSummary course={course} />
        <Criteria course={course} />
      </VStack>
    </HStack>
  );
}
