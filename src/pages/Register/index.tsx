import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import { HStack, Progress, Button, VStack, Input, Typography } from '../../components';

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
      <Input required type="email" id="email" label="example@korea.ac.kr" onChange={handleInput} autoFocus />
      <VStack style={{ justifyContent: 'end' }}>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          다음
        </Button>
      </VStack>
    </HStack>,
  ];

  return (
    <HStack gap="32px">
      <Progress rate={rate / 5}></Progress>
      <HStack type="left">
        <Typography variant="t2">환영합니다!</Typography>
        <Typography variant="t4">{desc[rate]}</Typography>
      </HStack>
      {pages[rate]}
      <VStack style={{ justifyContent: 'end' }}>
        <Button style="outline" variant="contained" color="primary" onClick={() => setRate(rate + 1)}>
          다음
        </Button>
      </VStack>
    </HStack>
  );
}
