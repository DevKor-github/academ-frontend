import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import { VStack } from '../VStack';
import Spacer from '../Spacer';
import { Button } from '../Button';
import { useSessionId } from '../../contexts/SessionIdContext';

import styles from './index.module.css';

interface TopNavProps {
  overlap?: boolean;
}

export function TopNav({ overlap = false }: TopNavProps) {
  const navigate = useNavigate();

  const { sessionId } = useSessionId();

  return (
    <Box
      className={`${styles.bar} ${overlap ? styles.gradient : ''}`}
      sx={{
        width: '100%',
        height: '72px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: overlap ? 100 : 0,
        position: overlap ? 'relative' : 'absolute',
        color: overlap ? 'white' : 'black',
      }}
    >
      <VStack>
        <Button label="서비스 이름" icon="./logo512.png" onClick={() => navigate('/')} />
      </VStack>
      <Spacer x={20} />
      <VStack>
        <Button label="시간표" onClick={() => navigate('/timetable')} />
        <Button label="강의추천" onClick={() => navigate('/curation')} />
        <Button label="마이페이지" onClick={() => navigate('/mypage')} />
      </VStack>
      <Spacer x={20} />
      <VStack>
        {sessionId ? (
          <Button label="로그아웃" onClick={() => navigate('/logout')} />
        ) : (
          <Button label="로그인/회원가입" onClick={() => navigate('/login')} />
        )}
      </VStack>
    </Box>
  );
}
