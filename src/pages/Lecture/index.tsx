import { useParams } from 'react-router-dom';

import { HStack } from '../../components';

import { SummaryView } from './SummaryView';
import { ReviewsView } from './ReviewsView';
import { BasicInfoView } from './BasicInfoView';

export function LecturePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams();

  // const reviews = [];

  return (
    <HStack style={{ height: '100%' }}>
      <BasicInfoView />
      <SummaryView />
      <ReviewsView />
    </HStack>
  );
}
