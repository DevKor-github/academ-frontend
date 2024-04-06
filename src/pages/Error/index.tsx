import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Button } from '../../components/Button';

interface ErrorPageProps {
  code?: number | string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ErrorPage(errorPageProps: ErrorPageProps) {
  const naviagte = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <Box sx={{ justifyContent: 'center' }}>
        <h1>오류가 발생했습니다.</h1>
        <h4>해당하는 리소스를 찾을 수 없습니다.</h4>
        <Button label="홈 화면으로 이동하기" onClick={() => naviagte('/')} />
      </Box>
    </Box>
  );
}
