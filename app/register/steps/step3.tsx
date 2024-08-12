'use client';

import { useEffect, useState } from 'react';

import { HStack, VStack } from '@/components/basic/stack';
import { apiDuplicateName, apiSignup } from '@/lib/api/login';

import Button from '@/components/basic/button';
import Input from '@/components/basic/input';

import ErrorLabel from '@/components/basic/errorlabel';

import { SignupRequest } from '@/lib/api/login';

const validatePw = (pw: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/;
  return re.test(String(pw));
};

const validateNum = (num: string) => {
  const re = /^\d{7}$/;
  return re.test(String(num));
};

export default function Step3({
  nextStep,
  setInput,
  input,
}: {
  nextStep: () => void;
  setInput: React.Dispatch<React.SetStateAction<SignupRequest>>;
  input: SignupRequest;
}) {
  const [isPwValid, setIsPwValid] = useState<boolean>(false);
  const [pwcheck, setpwCheck] = useState('');
  const [isNumValid, setIsNumValid] = useState<boolean>(false);

  interface NameState {
    username: string;
    isChecked: string;
    error: boolean;
  }

  const [nameCheck, setNameCheck] = useState<NameState>({ username: '', isChecked: '', error: false });

  useEffect(() => {
    setIsPwValid(validatePw(input.password));
  }, [input.password]);

  useEffect(() => {
    setIsNumValid(validateNum(input.student_id));
  }, [input.student_id]);

  function handlepwCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setpwCheck(value);
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
  }

  async function handleDuplicateName() {
    const response = await apiDuplicateName({ username: input.username });

    if (response.status === 'SUCCESS') {
      setNameCheck({ ...nameCheck, username: input.username, isChecked: response.status, error: false });
      window.alert('사용가능한 닉네임입니다.');
    } else {
      setNameCheck({ ...nameCheck, username: input.username, isChecked: response.status, error: true });
      window.alert('해당 닉네임은 이미 사용 중입니다.');
    }
  }

  async function handleRegister() {
    if (nameCheck.isChecked !== 'SUCCESS' || nameCheck.username !== input.username) {
      setNameCheck({ ...nameCheck, error: true });
      return;
    }

    const response = await apiSignup({ ...input } as SignupRequest);

    if (response.status === 'SUCCESS') {
      nextStep();
    } else {
      window.alert(`회원가입에 실패했습니다.
        ${response.message}`);
    }
  }

  return (
    <HStack gap="20px">
      <span className="text-4xl">회원가입</span>
      <span className="text-xl" style={{ marginBottom: '60px' }}>
        ACADEM에 오신걸 환영합니다!
        <br />
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
        style={{ width: '100%' }}
      />
      <span className="text-xl">비밀번호</span>
      <Input
        required
        type="password"
        id="password"
        label="비밀번호를 입력해주세요"
        onChange={handleInput}
        autoFocus
        style={{ width: '100%' }}
      />
      <ErrorLabel
        label={
          !isPwValid && input.password !== '' ? '영문과 숫자를 조합하여 8 - 24 자리의 비밀번호를 입력해주세요.' : ''
        }
      />
      <span className="text-xl">비밀번호 확인</span>
      <Input
        required
        type="password"
        id="pwcheck"
        value={pwcheck}
        placeholder="비밀번호를 다시 입력해주세요"
        onChange={handlepwCheck}
      />
      <ErrorLabel label={input.password !== pwcheck && pwcheck !== '' ? '비밀번호가 일치하지 않습니다.' : ''} />
      <span className="text-xl" style={{ marginTop: '10px' }}>
        닉네임
      </span>
      <VStack gap="10px" className="w-100% justify-between">
        <div className="grow">
          <Input required type="text" id="username" label="닉네임 (1-10자)" onChange={handleInput} />
        </div>
        <Button kind="filled" className="px-4 grow-0" onClick={handleDuplicateName}>
          닉네임 중복 확인
        </Button>
      </VStack>
      <ErrorLabel
        label={
          nameCheck.error
            ? nameCheck.isChecked === 'ERROR'
              ? '닉네임이 중복되었습니다. 다른 닉네임을 입력해주세요.'
              : '닉네임이 중복되는지 확인해주세요.'
            : ''
        }
      />
      <span className="text-xl">학번</span>
      <Input required type="text" id="student_id" label="학번" onChange={handleInput} style={{ width: '100%' }} />
      <ErrorLabel label={!isNumValid && input.student_id !== '' ? '7자리 학번을 입력해주세요.' : ''} />
      <span className="text-xl">학과</span>
      <Input required type="text" id="department" label="학과" onChange={handleInput} style={{ width: '100%' }} />
      <span className="text-xl">학위 / 학기</span>
      <VStack style={{ justifyContent: 'space-between', marginBottom: '40px' }}>
        <VStack gap="10px">
          <Button
            id="degree"
            kind={input.degree === 'MASTER' ? 'filled' : 'outline'}
            variant="contained"
            color="primary"
            onClick={() =>
              setInput((input: SignupRequest) => {
                return { ...input, degree: 'MASTER' };
              })
            }
          >
            <span className="text-xl" style={{ margin: '5px 30px' }}>
              석사
            </span>
          </Button>
          <Button
            id="degree"
            kind={input.degree === 'DOCTOR' ? 'filled' : 'outline'}
            variant="contained"
            color="primary"
            onClick={() =>
              setInput((input: SignupRequest) => {
                return { ...input, degree: 'DOCTOR' };
              })
            }
          >
            <span className="text-xl" style={{ margin: '5px 30px' }}>
              박사
            </span>
          </Button>
        </VStack>
        <VStack gap="10px" style={{ alignItems: 'center' }}>
          <Input required type="text" id="semester" style={{ width: '50px' }} onChange={handleInput} />
          <span className="text-xl">학기</span>
        </VStack>
      </VStack>
      <Button kind="filled" variant="contained" color="primary" onClick={handleRegister}>
        <span className="text-xl">완료</span>
      </Button>
    </HStack>
  );
}
