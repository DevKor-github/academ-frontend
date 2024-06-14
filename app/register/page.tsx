"use client";

import { redirect } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';




import { FinishIcon, RightIcon } from '../../icons';
import { HStack, VStack } from '@/components/basic/stack';
import TextField from '@/components/basic/textfield';
import Button from '@/components/basic/button';
import Input from '@/components/basic/input';
import Checkbox from '@/components/basic/checkbok';

import { apiCheckEmail, apiSignup, apiSendEmail, SignupRequest } from '@/api/login';

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
          <span className="text-xl" style={{ color: allAgreed ? '#DC143C' : '#737373' }}>
            이용약관 전체 동의
          </span>
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
            <span className="text-xl">이용약관 (필수)</span>
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
            <span className="text-xl">개인정보 수집 동의 (필수)</span>
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
        kind="filled"
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

  return (
    <HStack gap="20px">
      <span className="text-xl">환영합니다!</span>
      <span className="text-xl">고려대학교 이메일로 학생인증을 해주세요.</span>
      <Input required type="email" id="email" label="example@korea.ac.kr" onChange={handleInput} autoFocus />
      <VStack style={{ justifyContent: 'end' }}>
        <Button
          kind="outline"
          variant="contained"
          color="primary"
          disabled={!isEmailValid}
          onClick={isEmailValid ? handleSendEmail : () => undefined}
        >
          <VStack gap="36px" style={{ justifyContent: 'end', margin: '10px 22px' }}>
            <span className="text-xl">다음</span>
            <RightIcon />
          </VStack>
        </Button>
      </VStack>
      <VStack>
        현재 이메일 전송 API 버그가 있어 디버그를 위해 건너뛰기 기능을 제공하는 중입니다.
        <Button
          kind="outline"
          variant="contained"
          disabled={!isEmailValid}
          color="primary"
          onClick={isEmailValid ? () => setRate(rate + 2) : () => undefined}
        >
          건너뛰기
        </Button>
      </VStack>
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
      const response = await apiSendEmail({email : input.email + code});

      if (response.status === "SUCCESS") {
        setRate(rate + 1);
      }
    } catch (e) {
      window.alert('인증번호 발송 도중 예기치 못한 에러가 발생하였습니다.');
    }
  }

  return (
    <HStack style={{ justifyContent: 'center' }} gap="20px">
      <span className="text-xl">이메일로 인증번호가 발송되었습니다.</span>
      <TextField required type="text" id="varify" value="인증번호를 입력해주세요" onChange={handleCode} autoFocus />
      <VStack style={{ justifyContent: 'end' }}>
        <Button kind="outline" variant="contained" color="primary" onClick={handleCheckEmail}>
          <VStack gap="36px" style={{ justifyContent: 'end', margin: '10px 22px' }}>
            <span className="text-xl">다음</span>
            <RightIcon />
          </VStack>
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

  return (
    <HStack gap="20px">
      <span className="text-xl">회원가입</span>
      <span className="text-xl">ACADEM에 오신걸 환영합니다!</span>
      <span className="text-xl" style={{ marginBottom: '60px' }}>
        회원 정보를 입력해주세요.
      </span>
      <span className="text-xl">아이디</span>
      <Input
        required
        type="email"
        id="email"
        label={input.email}
        onChange={handleInput}
        disabled={true}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <span className="text-xl">비밀번호</span>
      <Input
        required
        type="password"
        id="password"
        label="비밀번호를 입력해주세요"
        onChange={handleInput}
        autoFocus
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <span className="text-xl">비밀번호 확인</span>
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
      <span className="text-xl" style={{ marginTop: '10px' }}>
        닉네임
      </span>
      <Input
        required
        type="text"
        id="username"
        label="닉네임"
        onChange={handleInput}
        style={{ width: '100%', marginBottom: '10px' }}
        autoFocus
      />
      <span className="text-xl">학번</span>
      <Input
        required
        type="text"
        id="studentId"
        label="학번"
        onChange={handleInput}
        style={{ width: '100%', marginBottom: '10px' }}
        autoFocus
      />
      <span className="text-xl">학과</span>
      <Input
        required
        type="text"
        id="department"
        label="학과"
        onChange={handleInput}
        style={{ width: '100%', marginBottom: '10px' }}
        autoFocus
      />
      <span className="text-xl">학위 / 학기</span>
      <VStack style={{ justifyContent: 'space-between', marginBottom: '40px' }}>
        <VStack gap="10px">
          <Button id="degree" kind="outline" variant="contained" color="primary" onClick={handleButtonClick}>
            <span className="text-xl" style={{ margin: '5px 30px' }}>
              석사
            </span>
          </Button>
          <Button id="degree" kind="outline" variant="contained" color="primary" onClick={handleButtonClick}>
            <span className="text-xl" style={{ margin: '5px 30px' }}>
              박사
            </span>
          </Button>
        </VStack>
        <VStack gap="10px" style={{ alignItems: 'center' }}>
          <Input required type="text" id="semester" style={{ width: '50px' }} onChange={handleInput} autoFocus />
          <span className="text-xl">학기</span>
        </VStack>
      </VStack>
      <Button kind="filled" variant="contained" color="primary" onClick={handleRegister}>
        <span className="text-xl">완료</span>
      </Button>
      <VStack style={{ justifyContent: 'end' }}>
        <Button kind="outline" variant="contained" color="primary" onClick={() => setRate(rate + 1)}>
          다음
        </Button>
      </VStack>
    </HStack>
  );
}

function Register4() {

  return (
    <HStack gap="20px">
      <FinishIcon />
      <span className="text-xl">회원가입 완료!</span>
      <Button
        kind="filled"
        className="styles.fullWidth"
        variant="contained"
        color="primary"
        onClick={() => redirect('/login')}
      >
        로그인 화면으로
      </Button>
    </HStack>
  );
}

export default function RegisterPage() {
  const [rate, setRate] = useState(0);


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
      const response = await apiSendEmail({email: input.email});

      if (response.status === "SUCCESS") {
        const id = input.email;
        setInput({ ...input, [input.email]: id.slice(0, -12) });
        setRate(rate + 1);
      }
    } catch (e) {
      window.alert('인증번호 발송을 실패하였습니다. 회원가입을 다시 진행해주십시오.');
      redirect('/login');
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
      const response = await apiSignup({...input, student_id : "asdf", code: "asdf"} as SignupRequest); /* {
        headers: {
          'Content-Type': 'application/json',
        }, */

      if (response.status === "SUCCESS") {
        window.alert('회원가입이 완료되었습니다.');
        redirect('/');
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
