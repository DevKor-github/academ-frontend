import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import { triggerWhenRendered } from '../../contexts/RenderTriggerContext';
import { A, HStack, Progress, Button, VStack, Input, Typography } from '../../components';

/**
 * 유저 생성 페이지입니다.
 * 회원가입을 위한 정보를 입력받습니다.
 * 회원가입 버튼을 누르면 백엔드 서버에 회원가입 요청을 보냅니다.
 */

function Register0({
  rate,
  setRate,
  handleInput,
}: {
  rate: number;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const navigate = useNavigate();

  triggerWhenRendered();
  return (
    <HStack gap="20px">
      <Typography variant="t1">환영합니다.</Typography>
      <Typography variant="t3">고려대학교 이메일로 학생 인증을 해주세요.</Typography>
      <Input required type="email" id="email" label="example@korea.ac.kr" onChange={handleInput} autoFocus />
      <Typography variant="t5">
        "계속하기"를 눌러 진행하는 경우, <A href="/terms/policy">이용약관</A> 및{' '}
        <A href="/terms/privacy">개인정보 수집·이용 동의</A>에 동의한 것으로 간주합니다.
      </Typography>
      <VStack gap="16px" style={{ justifyContent: 'end' }}>
        <Button kind="outline" variant="contained" color="primary" onClick={() => navigate(-1)}>
          가입하지 않기
        </Button>
        <Button kind="outline" variant="contained" color="primary" onClick={() => setRate(rate + 1)}>
          계속하기
        </Button>
      </VStack>
    </HStack>
  );
}

function Register1({
  rate,
  setRate,
  handleInput,
  handleRegister,
}: {
  rate: number;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: () => Promise<void>;
}) {
  triggerWhenRendered();
  return (
    <HStack gap="20px">
      <Typography variant="t3">인증번호가 전송되었습니다. 번호를 입력해주세요</Typography>
      <Input required type="email" id="email" label="example@korea.ac.kr" onChange={handleInput} autoFocus />
      <VStack style={{ justifyContent: 'end' }}>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          다음
        </Button>
      </VStack>
      <VStack style={{ justifyContent: 'end' }}>
        <Button kind="outline" variant="contained" color="primary" onClick={() => setRate(rate + 1)}>
          다음
        </Button>
      </VStack>
    </HStack>
  );
}

function Register2({
  rate,
  setRate,
  handleInput,
}: {
  rate: number;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  triggerWhenRendered();
  return (
    <HStack gap="20px">
      <Typography variant="t1">환영합니다.</Typography>
      <Typography variant="t3">회원 정보를 입력해주세요.</Typography>
      <Input required type="text" id="string" label="example@korea.ac.kr" onChange={handleInput} autoFocus />
      <Input required type="password" id="pwcheck" label="example@korea.ac.kr" onChange={handleInput} autoFocus />
      <Input required type="password" id="pwcheck2" label="example@korea.ac.kr" onChange={handleInput} autoFocus />
      <Input required type="text" id="string" label="asdfasdfr" onChange={handleInput} autoFocus />
      <Input required type="password" id="pwcheck" label="examasdasdf.kr" onChange={handleInput} autoFocus />
      <Input required type="password" id="pwcheck2" label="exaasdfsc.kr" onChange={handleInput} autoFocus />
      <VStack style={{ justifyContent: 'end' }}>
        <Button kind="outline" variant="contained" color="primary" onClick={() => setRate(rate + 1)}>
          다음
        </Button>
      </VStack>
    </HStack>
  );
}

function Register3() {
  const navigate = useNavigate();

  triggerWhenRendered();

  return (
    <HStack gap="20px">
      <Typography variant="t1">환영합니다.</Typography>
      <Typography variant="t3">회원가입이 완료되었습니다.</Typography>
      <VStack style={{ justifyContent: 'end' }}>
        <Button kind="outline" variant="contained" color="primary" onClick={() => navigate('/login')}>
          로그인 화면으로
        </Button>
      </VStack>
    </HStack>
  );
}

export function RegisterPage() {
  const [rate, setRate] = useState(0);

  const navigate = useNavigate();

  const [input, setInput] = useState({
    lastName: '',
    firstName: '',
    age: 0,
  });

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

  const pages = [
    <Register0 setRate={setRate} rate={rate} handleInput={handleInput} />,
    <Register1 setRate={setRate} rate={rate} handleInput={handleInput} handleRegister={handleRegister} />,
    <Register2 setRate={setRate} rate={rate} handleInput={handleInput} />,
    <Register3 />,
  ];

  return (
    <HStack gap="32px">
      <Progress rate={rate / 3}></Progress>
      {pages[rate]}
    </HStack>
  );
}
