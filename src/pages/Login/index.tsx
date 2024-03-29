import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';

export function LoginPage() {
  const [input, setInput] = useState({
    id: '',
    password: '',
  });

  const navigate = useNavigate();

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  }

  /**
   * 회원가입 버튼을 클릭하면 발생하는 함수입니다.
   * 백엔드 서버에 회원가입 요청을 보냅니다.
   * 회원가입이 완료되면 메인 페이지로 이동합니다.
   * 상태코드 201은 생성 성공을 의미합니다.
   * navigate('주소')는 해당 주소로 이동하는 함수입니다.
   * 참고로, navigate(-1)은 이전 페이지로 이동하는 함수입니다.
   */
  async function handleLogin() {
    try {
      const response = await axios.post(``, input, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        window.alert('회원가입이 완료되었습니다.');
        navigate('/');
      }
    } catch (e) {
      window.alert('회원가입에 실패했습니다.');
    }
  }

  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h4">로그인</Typography>
      </Box>
      <Box>
        <Box marginY={2}>
          <Divider />
        </Box>
        <Stack spacing={2}>
          <TextField required id="id" label="ID" onChange={handleInput} />
          <TextField required id="firstName" type="password" label="비밀번호" onChange={handleInput} />
        </Stack>
      </Box>
      <Box paddingY={6}>
        <Stack spacing={3} direction="row" justifyContent={'center'}>
          <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
            이전
          </Button>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            로그인
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
