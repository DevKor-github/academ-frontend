import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useSessionId } from '../../contexts/SessionIdContext';

export function LogoutPage() {
  const navigate = useNavigate();
  const { setSessionId } = useSessionId();

  useEffect(() => {
    setSessionId('');
    navigate('/');
  }, []);

  return <div />;
}
