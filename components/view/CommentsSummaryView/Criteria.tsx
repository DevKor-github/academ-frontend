import { VStack, HStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import Progress, { ProgressLoading } from '@/components/basic/progress';
import Skeleton from '@/components/composite/skeleton';

interface CriteriaIndicatorProp {
  name: string;
  low: string;
  high: string;
  rate: number;
  style?: React.CSSProperties;
  reverse: boolean;
}

function CriteriaIndicator({ name, low, high, style, rate, reverse }: CriteriaIndicatorProp) {
  return (
    <HStack className="justify-between w-full gap-4" style={style}>
      <VStack className="justify-between items-end gap-x-3">
        <span className="text-xl animate-fade">{name}</span>
        <span className="text-2xl font-bold animate-fade">{rate.toFixed(1)}</span>
      </VStack>
      <HStack className="gap-y-3 p-5 rounded-xl border-neutral-200 border" style={{ width: '300px' }}>
        <VStack style={{ justifyContent: 'space-between' }}>
          <Tag className="animate-fade">{low}</Tag>
          <Tag className="animate-fade">{high}</Tag>
        </VStack>
        <Progress className="animate-fade" rate={rate / 5} reverse={reverse} />
      </HStack>
    </HStack>
  );
}

export function CriteriaIndicatorLoading({
  name,
  low,
  high,
  style,
}: Pick<CriteriaIndicatorProp, 'name' | 'low' | 'high' | 'style'>) {
  return (
    <HStack className="justify-between w-full gap-4" style={style}>
      <VStack className="gap-x-3 justify-between items-end">
        <span className="text-xl">{name}</span>
        <span className="text-2xl font-bold">{<Skeleton placeholder="?.?" />}</span>
      </VStack>
      <HStack className="gap-y-3 p-5 rounded-xl border-neutral-200 border" style={{ width: '300px' }}>
        <VStack style={{ justifyContent: 'space-between' }}>
          <Tag>{low}</Tag>
          <Tag>{high}</Tag>
        </VStack>
        <ProgressLoading />
      </HStack>
    </HStack>
  );
}

export function CriteriaLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 self-center w-fit max-w-full gap-x-8 gap-y-8">
      <CriteriaIndicatorLoading name="학습량" low="적음" high="많음" />
      <CriteriaIndicatorLoading name="난이도" low="낮음" high="높음" />
      <CriteriaIndicatorLoading name="전달력" low="나쁨" high="좋음" />
      <CriteriaIndicatorLoading name="학점" low="낮음" high="높음" />
    </div>
  );
}

export default function Criteria({ course }: { course: Course }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 self-center w-fit max-w-full gap-x-8 gap-y-8">
      <CriteriaIndicator name="학습량" low="적음" high="많음" rate={course.avg_r1_amount_of_studying} reverse={true} />
      <CriteriaIndicator name="난이도" low="낮음" high="높음" rate={course.avg_r2_difficulty} reverse={true} />
      <CriteriaIndicator name="전달력" low="나쁨" high="좋음" rate={course.avg_r3_delivery_power} reverse={false} />
      <CriteriaIndicator name="학점" low="낮음" high="높음" rate={course.avg_r4_grading} reverse={false} />
    </div>
  );
}
