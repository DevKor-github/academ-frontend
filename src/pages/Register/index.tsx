import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Divider, Stack, TextField, Typography } from '@mui/material';

import { HStack, Progress, Button, VStack, Spacer } from '../../components';

/**
 * 유저 생성 페이지입니다.
 * 회원가입을 위한 정보를 입력받습니다.
 * 회원가입 버튼을 누르면 백엔드 서버에 회원가입 요청을 보냅니다.
 */

export function RegisterPage() {
  const [rate, setRate] = useState(0);

  const [input, setInput] = useState({
    lastName: '',
    firstName: '',
    age: 0,
  });

  const navigate = useNavigate();

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
  }

  async function handleRegister() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login/signup`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        window.alert('회원가입이 완료되었습니다.');
        navigate('/');
      }
    } catch (e) {
      window.alert('회원가입에 실패했습니다.');
    }
  }

  const desc = ['고려대학교 이메일로 학생 인증을 해주세요', '', '고려대학교 이메일로 학생 인증을 해주세요'];
  const pages = [
    <HStack>
      <Box>
        <Box marginY={2}>
          <Divider />
        </Box>
        <Stack spacing={2}>
          <TextField focused required type="email" id="email" label="example@korea.ac.kr" onChange={handleInput} />
        </Stack>
      </Box>
      <Box paddingY={6}>
        <Stack spacing={3} direction="row" justifyContent={'center'}>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            다음
          </Button>
        </Stack>
      </Box>
    </HStack>,
  ];

  return (
    <HStack>
      <Box marginBottom={4} textAlign={'left'}>
        <Typography variant="h4">환영합니다!</Typography>
        <Typography variant="h6">{desc[rate]}</Typography>
      </Box>
      <Progress rate={rate / 5}></Progress>
      {pages[rate]}
      <Box paddingY={6}>
        <VStack>
          <Spacer />
          <Button style="outline" variant="contained" color="primary" onClick={() => setRate(rate + 1)}>
            다음
          </Button>
        </VStack>
      </Box>
    </HStack>
  );
}
