import { HStack, VStack } from '@/components/basic/stack';
import { twMerge } from 'tailwind-merge';
import Criteria, { CriteriaLoading } from './CommentsSummaryView/Criteria';
import RateSummary, { RateSummaryLoading } from './CommentsSummaryView/RateSummary';

function CommentsSummaryBox({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  const tn = twMerge('pl-8 pr-8 pb-8', className);

  return (
    <HStack gap="30px" className={tn} style={{ marginTop: '60px' }}>
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
        {children}
      </VStack>
    </HStack>
  );
}

export function CommentsSummaryViewLoading() {
  return (
    <CommentsSummaryBox>
      <RateSummaryLoading />
      <CriteriaLoading />
    </CommentsSummaryBox>
  );
}

export default function CommentsSummaryView({ course }: { course: Course }) {
  return (
    <CommentsSummaryBox>
      <RateSummary course={course} />
      <Criteria course={course} />
    </CommentsSummaryBox>
  );
}
