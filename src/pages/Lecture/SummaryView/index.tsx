import { StarIcon } from '../../../icons';
import GlobalStyles from '../../../Global.module.css';
import { HStack, VStack, Typography, Tag } from '../../../components';

import { CriteriaIndicator } from './CriteriaIndicator';

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

function RateSummary() {
  const tags = ['친절한', '뿌듯한', '과제량이 많은', '뿌듯한', '과제량이 많은'];

  return (
    <HStack style={{ border: '1px solid var(--d4d4d4)', borderRadius: '20px', padding: '80px 40px', width: '480px' }}>
      <VStack
        gap="4px"
        style={{
          borderBottom: '1px solid var(--dbdbdb)',
          alignItems: 'end',
          paddingBottom: '20px',
          marginBottom: '20px',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          <Typography bold variant="t-4">
            4.0
          </Typography>
          <Typography variant="t2" style={{ color: 'var(--9b9b9b)' }}>
            {' '}
            /5
          </Typography>
          <Typography variant="t2" style={{ color: 'var(--dbdbdb)' }}>
            {' '}
            (57)
          </Typography>
        </span>
        <Stars rate0to5={4.1} />
      </VStack>
      <VStack style={{ flexWrap: 'wrap', justifyContent: 'start' }}>
        {tags.map((t) => (
          <Tag style={{ margin: '6px 6px 0px 0px' }} children={t} />
        ))}
      </VStack>
    </HStack>
  );
}

function Criterias() {
  return (
    <HStack gap="10px" style={{ width: '320px', margin: '20px 0px' }}>
      <CriteriaIndicator name="학습량" low="1" high="5" rate={1.5} />
      <CriteriaIndicator name="성적" low="낮음" high="높음" rate={1.5} />
      <CriteriaIndicator name="강의력" low="나쁨" high="좋음" rate={1.5} />
      <CriteriaIndicator name="난이도" low="낮음" high="높음" rate={1.5} />
    </HStack>
  );
}

export function SummaryView() {
  return (
    <HStack gap="30px" className={`${GlobalStyles.metacontainer}`} style={{ marginTop: '160px' }}>
      <Typography variant="t3" children="평가 한눈에보기" />

      <VStack
        gap="20px"
        style={{ justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'start', margin: '20px 0px' }}
      >
        <RateSummary />
        <Criterias />
      </VStack>
    </HStack>
  );
}
