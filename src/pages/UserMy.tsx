import { useSessionId } from '../contexts/SessionIdContext';
import { HStack } from '../components';

import { ErrorLoginRequiredPage } from './Error';

export function UserMyPage() {
  const { sessionId } = useSessionId();

  return <HStack style={{ margin: '40px' }}>{sessionId ? <span>dasdfasfd</span> : <ErrorLoginRequiredPage />}</HStack>;
}
