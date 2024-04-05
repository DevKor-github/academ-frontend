/**
 * 아이콘 목록은 아래 링크에서 확인 가능.
 * 버튼 누르면 바로 복사해서 사용할 수 있음.
 * https://mui.com/material-ui/material-icons/
 */

import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import { VStack } from '../VStack';
import Spacer from '../Spacer';
import { Button } from '../Button';
import { useSessionId } from '../../contexts/SessionIdContext';

export default function TopNav() {
  const navigate = useNavigate();

  const { sessionId } = useSessionId();

  return (
    <Box
      sx={{ width: '100%', height: '30px', backgroundColor: 'aliceblue', display: 'flex', justifyContent: 'center' }}
    >
      <VStack>
        <Button label="서비스 이름" onClick={() => navigate('/')} />
      </VStack>
      <Spacer x={10} />
      <VStack>
        <Button label="시간표" onClick={() => navigate('/timetable')} />
        <Button label="강의추천" onClick={() => navigate('/curation')} />
        <Button label="마이페이지" onClick={() => navigate('/mypage')} />
      </VStack>
      <Spacer x={10} />
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
