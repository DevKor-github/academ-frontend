import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Stack, TextField, ToggleButton, Typography } from '@mui/material';

import { useSessionId } from '../../contexts/SessionIdContext';

export function LoginPage() {
  const [input, setInput] = useState({
    id: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setSessionId } = useSessionId();

  const [saveLoginInfo, setSaveLoginInfo] = useState(false);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  }

  async function handleLogin() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (response.status === 200) {
        window.alert('로그인이 완료되었습니다.');
        setSessionId('sesssionId from backend server');
        navigate('/');
      }
    } catch (e) {
      window.alert('로그인에 실패했습니다.');
    }
  }

  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
          이전
        </Button>
        <Typography variant="h4">로그인</Typography>
      </Box>
      <Box>
        <Stack spacing={2}>
          <TextField required id="id" label="ID" onChange={handleInput} />
          <TextField required id="firstName" type="password" label="비밀번호" onChange={handleInput} />
        </Stack>
      </Box>
      <Box paddingY={6}>
        <Stack spacing={3} direction="row" justifyContent={'center'}>
          <ToggleButton value="check" selected={saveLoginInfo} onClick={() => setSaveLoginInfo(!saveLoginInfo)}>
            로그인 정보 저장
          </ToggleButton>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            비밀번호 찾기
          </Button>
        </Stack>
      </Box>
      <Box>
        <Stack spacing={3} direction="row" justifyContent={'center'}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            로그인
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('./register')}>
            회원가입
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
