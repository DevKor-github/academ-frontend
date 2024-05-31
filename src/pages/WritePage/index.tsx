import { useParams } from 'react-router-dom';

import { HStack } from '../../components';

export function WritePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams();

  // const reviews = [];

  return <HStack style={{ height: '100%' }}>hi</HStack>;
}
