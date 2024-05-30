import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

import { FinishIcon, RightIcon } from '../../icons';
import { triggerWhenRendered } from '../../contexts/RenderTriggerContext';
import { HStack, Button, VStack, Input, Typography, Checkbox, TextField } from '../../components';

/**
 * 유저 생성 페이지입니다.
 * 회원가입을 위한 정보를 입력받습니다.
 * 회원가입 버튼을 누르면 백엔드 서버에 회원가입 요청을 보냅니다.
 */

function Register0({ rate, setRate }: { rate: number; setRate: React.Dispatch<React.SetStateAction<number>> }) {
  const [agreements, setAgreements] = useState({
    termsAgreed: false,
    personalInfoAgreed: false,
  });
  const [allAgreed, setAllAgreed] = useState(false);

  const handelAgreementChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }));
    const allChecked = Object.values({ ...agreements, [name]: checked }).every((value) => value === true);
    setAllAgreed(allChecked);
  };

  const handleAllAgreementChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setAgreements({
      termsAgreed: checked,
      personalInfoAgreed: checked,
    });
    setAllAgreed(checked);
  };

  return (
    <HStack gap="20px" style={{ height: '100%', justifyContent: 'space-between' }}>
      <div
        style={{
          backgroundColor: allAgreed ? 'rgba(230, 90, 118, 0.05)' : '#F5F5F5',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <VStack style={{ justifyContent: 'space-between' }}>
          <Typography variant="t3" style={{ color: allAgreed ? '#DC143C' : '#737373' }}>
            이용약관 전체 동의
          </Typography>
          <Checkbox checked={allAgreed} onChange={handleAllAgreementChange} />
        </VStack>
      </div>
      <div
        style={{
          backgroundColor: allAgreed ? 'rgba(230, 90, 118, 0.05)' : '#F5F5F5',
          padding: '20px',
          borderRadius: '12px',
        }}
      >
        <HStack gap="10px">
          <VStack style={{ justifyContent: 'space-between', paddingLeft: '5px' }}>
            <Typography variant="t5">이용약관 (필수)</Typography>
            <Checkbox name="termsAgreed" checked={agreements.termsAgreed} onChange={handelAgreementChange} />
          </VStack>
          <div
            style={{
              backgroundColor: 'white',
              padding: '15px',
              width: '100%',
              height: '250px',
              borderRadius: '12px',
              marginBottom: '20px',
              overflowY: 'scroll',
            }}
          ></div>
          <VStack style={{ justifyContent: 'space-between', paddingLeft: '5px' }}>
            <Typography variant="t5">개인정보 수집 동의 (필수)</Typography>
            <Checkbox
              name="personalInfoAgreed"
              checked={agreements.personalInfoAgreed}
              onChange={handelAgreementChange}
            />
          </VStack>
          <div
            style={{
              backgroundColor: 'white',
              padding: '15px',
              width: '100%',
              height: '250px',
              borderRadius: '12px',
              overflowY: 'scroll',
            }}
          ></div>
        </HStack>
      </div>

      <Button
        style="filled"
        disabled={!allAgreed}
        variant="contained"
        color="primary"
        onClick={() => (allAgreed ? setRate(rate + 1) : setRate(rate))}
      >
        회원가입
      </Button>
    </HStack>
  );
}

function Register1({
  rate,
  setRate,
  handleInput,
  handleSendEmail,
  input,
}: {
  rate: number;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendEmail: () => Promise<void>;
  input: { email: string; [key: string]: unknown };
}) {
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@korea\.ac\.kr$/;
    return re.test(String(email).toLowerCase());
  };

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  useEffect(() => {
    setIsEmailValid(validateEmail(input.email));
  }, [input.email]);

  triggerWhenRendered();

  return (
    <HStack gap="20px">
      <Typography variant="t1">환영합니다!</Typography>
      <Typography variant="t3">고려대학교 이메일로 학생인증을 해주세요.</Typography>
      <Input required type="email" id="email" label="example@korea.ac.kr" onChange={handleInput} autoFocus />
      <VStack style={{ justifyContent: 'end' }}>
        <Button
          style="outline"
          variant="contained"
          color="primary"
          disabled={!isEmailValid}
          onClick={isEmailValid ? handleSendEmail : setRate(rate)}
        >
          <VStack gap="36px" style={{ justifyContent: 'end', margin: '10px 22px' }}>
            <Typography variant="t4">다음</Typography>
            <RightIcon />
          </VStack>
        </Button>
      </VStack>
      <Button style="outline" variant="contained" color="primary" onClick={() => setRate(rate + 1)}>
        <VStack gap="36px" style={{ justifyContent: 'end', margin: '10px 22px' }}>
          <Typography variant="t4">다음</Typography>
          <RightIcon />
        </VStack>
      </Button>
    </HStack>
  );
}

function Register2({
  rate,
  setRate,
  input,
}: {
  rate: number;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  input: { email: string; [key: string]: unknown };
}) {
  const [code, setCode] = useState<string>();

  function handleCode(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setCode(value);
  }

  async function handleCheckEmail() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/signup/send-email`, input.email + code);

      if (response.status === 200) {
        setRate(rate + 1);
      }
    } catch (e) {
      window.alert('인증번호 발송 도중 예기치 못한 에러가 발생하였습니다.');
    }
  }

  triggerWhenRendered();
  return (
    <HStack style={{ justifyContent: 'center' }} gap="20px">
      <Typography variant="t3">이메일로 인증번호가 발송되었습니다.</Typography>
      <Input required type="text" id="varify" label="인증번호를 입력해주세요" onChange={handleCode} autoFocus />
      <VStack style={{ justifyContent: 'end' }}>
        <Button style="outline" variant="contained" color="primary" onClick={handleCheckEmail}>
          <VStack gap="36px" style={{ justifyContent: 'end', margin: '10px 22px' }}>
            <Typography variant="t4">다음</Typography>
            <RightIcon />
          </VStack>
        </Button>
      </VStack>
      <VStack style={{ justifyContent: 'end' }}>
        <Button style="outline" variant="contained" color="primary" onClick={() => setRate(rate + 1)}>
          다음
        </Button>
      </VStack>
    </HStack>
  );
}

function Register3({
  rate,
  setRate,
  handleInput,
  handleButtonClick,
  handleRegister,
  input,
}: {
  rate: number;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRegister: () => Promise<void>;
  input: { email: string; password: string; [key: string]: unknown };
}) {
  const [pwcheck, setpwCheck] = useState('');

  function handlepwCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setpwCheck(value);
  }

  const [ispwValid, setIspwValid] = useState<boolean>(false);

  useEffect(() => {
    setIspwValid(pwcheck !== '' && pwcheck === input.password);
  });

  triggerWhenRendered();
  return (
    <HStack gap="20px">
      <Typography variant="t1">회원가입</Typography>
      <Typography variant="t3">ACADEM에 오신걸 환영합니다!</Typography>
      <Typography variant="t3" style={{ marginBottom: '60px' }}>
        회원 정보를 입력해주세요.
      </Typography>
      <Typography variant="t3">아이디</Typography>
      <Input
        required
        type="email"
        id="email"
        label={input.email}
        onChange={handleInput}
        disabled={true}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Typography variant="t3">비밀번호</Typography>
      <Input
        required
        type="password"
        id="password"
        label="비밀번호를 입력해주세요"
        onChange={handleInput}
        autoFocus
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Typography variant="t3">비밀번호 확인</Typography>
      <TextField
        required
        type="password"
        id="pwcheck"
        value={pwcheck}
        placeholder="비밀번호를 다시 입력해주세요"
        onChange={handlepwCheck}
        errorMessage="비밀번호가 일치하지 않습니다"
        isError={!ispwValid}
        autoFocus
      />
      <Typography variant="t3" style={{ marginTop: '10px' }}>
        닉네임
      </Typography>
      <Input
        required
        type="text"
        id="username"
        label="닉네임"
        onChange={handleInput}
        style={{ width: '100%', marginBottom: '10px' }}
        autoFocus
      />
      <Typography variant="t3">학번</Typography>
      <Input
        required
        type="text"
        id="studentId"
        label="학번"
        onChange={handleInput}
        style={{ width: '100%', marginBottom: '10px' }}
        autoFocus
      />
      <Typography variant="t3">학과</Typography>
      <Input
        required
        type="text"
        id="department"
        label="학과"
        onChange={handleInput}
        style={{ width: '100%', marginBottom: '10px' }}
        autoFocus
      />
      <Typography variant="t3">학위 / 학기</Typography>
      <VStack style={{ justifyContent: 'space-between', marginBottom: '40px' }}>
        <VStack gap="10px">
          <Button id="degree" style="outline" variant="contained" color="primary" onClick={handleButtonClick}>
            <Typography variant="t5" style={{ margin: '5px 30px' }}>
              석사
            </Typography>
          </Button>
          <Button id="degree" style="outline" variant="contained" color="primary" onClick={handleButtonClick}>
            <Typography variant="t5" style={{ margin: '5px 30px' }}>
              박사
            </Typography>
          </Button>
        </VStack>
        <VStack gap="10px" style={{ alignItems: 'center' }}>
          <Input required type="text" id="semester" style={{ width: '50px' }} onChange={handleInput} autoFocus />
          <Typography variant="t4">학기</Typography>
        </VStack>
      </VStack>
      <Button style="filled" variant="contained" color="primary" onClick={handleRegister}>
        <Typography variant="t4">완료</Typography>
      </Button>
      <VStack style={{ justifyContent: 'end' }}>
        <Button style="outline" variant="contained" color="primary" onClick={() => setRate(rate + 1)}>
          다음
        </Button>
      </VStack>
    </HStack>
  );
}

function Register4() {
  const navigate = useNavigate();

  triggerWhenRendered();

  return (
    <HStack gap="20px" type="center">
      <FinishIcon />
      <Typography variant="t3">회원가입 완료!</Typography>
      <Button
        style="filled"
        className="styles.fullWidth"
        variant="contained"
        color="primary"
        onClick={() => navigate('/login')}
      >
        로그인 화면으로
      </Button>
    </HStack>
  );
}

export function RegisterPage() {
  const [rate, setRate] = useState(0);

  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: '',
    password: '',
    username: '',
    studentId: '',
    degree: '',
    semester: 1,
    department: '',
  });

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
  }

  async function handleSendEmail() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/signup/send-email`, input.email);

      if (response.status === 200) {
        const id = input.email;
        setInput({ ...input, [input.email]: id.slice(0, -12) });
        setRate(rate + 1);
      }
    } catch (e) {
      window.alert('인증번호 발송을 실패하였습니다. 회원가입을 다시 진행해주십시오.');
      navigate('/login');
    }
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id, textContent } = event.currentTarget;
    const value = textContent === '박사' ? 'DOCTER' : 'MASTER';
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  async function handleRegister() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, input, {
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
    <Register0 setRate={setRate} rate={rate} />,
    <Register1
      setRate={setRate}
      rate={rate}
      handleInput={handleInput}
      handleSendEmail={handleSendEmail}
      input={input}
    />,
    <Register2 setRate={setRate} rate={rate} input={input} />,
    <Register3
      setRate={setRate}
      rate={rate}
      handleInput={handleInput}
      handleRegister={handleRegister}
      handleButtonClick={handleButtonClick}
      input={input}
    />,
    <Register4 />,
  ];

  return (
    <HStack gap="40px" style={{ width: '400px', margin: '40px 0px' }}>
      {pages[rate]}
    </HStack>
  );
}
