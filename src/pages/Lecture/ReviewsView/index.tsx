import styled from '@emotion/styled';

import { ReviewView } from '../ReviewView';
import { MainContainer } from '../../../components/composite/MainContainer';
import { HStack, VStack, Typography } from '../../../components';

const ResultsViewBox = styled(MainContainer)`
  background-color: var(--f5f5f5);
  padding-top: 40px;
  padding-bottom: 40px;
  flex-grow: 1;
`;

export function ReviewsView() {
  const reviews = ['a', 'b'];

  return reviews.length === 0 ? (
    <ResultsViewBox>
      <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="t3">강의평 목록</Typography>
        <Typography variant="t6">최신순 등록순</Typography>
      </HStack>
    </ResultsViewBox>
  ) : (
    <ResultsViewBox>
      <VStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="t3">강의평 목록</Typography>
        <Typography variant="t6">최신순 등록순</Typography>
      </VStack>
      {reviews.map(() => (
        <ReviewView />
      ))}
    </ResultsViewBox>
  );
}
