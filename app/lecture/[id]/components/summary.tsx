import { StarIcon } from '@/icons';
import Tag from '@/components/basic/tag';
import { HStack, VStack } from '@/components/basic/stack';
import { Course } from '@/lib/models/course';
import Progress from '@/components/basic/progress';


function Stars({ rate0to5 }: { rate0to5: number }) {
  const size = '24px';

  return (
    <VStack style={{ paddingBottom: '8px' }}>
      <StarIcon width={size} height={size} fill={rate0to5 >= 1 ? 'var(--accent)' : 'var(--dbdbdb)'} />
      <StarIcon width={size} height={size} fill={rate0to5 >= 2 ? 'var(--accent)' : 'var(--dbdbdb)'} />
      <StarIcon width={size} height={size} fill={rate0to5 >= 3 ? 'var(--accent)' : 'var(--dbdbdb)'} />
      <StarIcon width={size} height={size} fill={rate0to5 >= 4 ? 'var(--accent)' : 'var(--dbdbdb)'} />
      <StarIcon width={size} height={size} fill={rate0to5 >= 5 ? 'var(--accent)' : 'var(--dbdbdb)'} />
    </VStack>
  );
}

function RateSummary({course} : {course : Course}) {
  const tags = ['친절한', '뿌듯한', '과제량이 많은', '뿌듯한', '과제량이 많은'];

  return (
    <HStack className='border-neutral-200 border' style={{  borderRadius: '20px', padding: '80px 40px', width: '480px',  maxWidth: '100%'}}>
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
          <span className='text-6xl font-bold'>
            {course.avg_rating}
          </span>
          <span className='text-4xl' style={{ color: 'grey' }}>
            {' '}
            /5
          </span>
          <span className='text-4xl' style={{ color: 'grey' }}>
            {' '}
            (57)
          </span>
        </span>
        <Stars rate0to5={4.1} />
      </VStack>
      <VStack style={{ flexWrap: 'wrap', justifyContent: 'start' }}>
        {tags.map((t) => (
          <Tag key={t} style={{ margin: '6px 6px 0px 0px' }} >{t}</Tag>
        ))}
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
    <VStack className='justify-between w-full' style={style}>
      <VStack style={{ justifyContent: 'between', alignItems: 'center' }} gap="8px">
        <span className='text-xl'>{name}</span>
        <span className='text-xl font-bold'>{rate}</span>
      </VStack>
      <HStack gap="10px" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--d4d4d4)', width:'300px' }}>
        <VStack style={{ justifyContent: 'space-between' }}>
          <Tag className="bg-neutral-100">{low}</Tag>
          <Tag className="bg-neutral-100">{high}</Tag>
        </VStack>
        <Progress rate={rate / 5} />
      </HStack>
    </VStack>
  );
}


function Criteria() {
  return (
    <HStack className='border-neutral-200 border' style={{  borderRadius: '20px', padding: '80px 40px', width: '480px', maxWidth: '100%' }}>
        <CriteriaIndicator name="학습량" low="1" high="5" rate={1.5}  />
        <CriteriaIndicator name="성적" low="낮음" high="높음" rate={1.5} />
        <CriteriaIndicator name="강의력" low="나쁨" high="좋음" rate={1.5} />
        <CriteriaIndicator name="난이도" low="낮음" high="높음" rate={1.5}  />
    </HStack>
  );
}

export default function SummaryView( {course} : {course : Course}) {
  return (
    <HStack gap="30px" className="pl-8 pr-8 pb-8" style={{ marginTop: '160px' }}>
      <span className='text-2xl'>평가 한눈에 보기</span>

      <VStack
        gap="20px"
        style={{ rowGap:'20px', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'start', margin: '20px 0px' }}
      >
        <RateSummary course={course} />
        <Criteria />
      </VStack>
    </HStack>
  );
}
