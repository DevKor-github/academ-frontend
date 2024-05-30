import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useSessionId } from '../../contexts/SessionIdContext';
import { LogoutAPI } from '../../api/logout';

export function LogoutPage() {
  const navigate = useNavigate();
  const { setSessionId } = useSessionId();

  useEffect(() => {
    setTimeout(() => {
      LogoutAPI().finally(() => {
        setSessionId('');
        navigate('/');
      });
    }, 1);
  }, []);

  return <div>로그아웃 중입니다!</div>;
}
