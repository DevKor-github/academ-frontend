import { useState, } from "react";

import { HStack, VStack } from "@/components/basic/stack";
import { apiSignup } from "@/lib/api/login";

import TextField from "@/components/basic/textfield";
import Button from "@/components/basic/button";
import Input from "@/components/basic/input";

import { SignupRequest } from "@/lib/api/login";

export default function Step3({
  nextStep,
  setInput,
  input,
}: {
  nextStep: () => void;
  setInput: React.Dispatch<React.SetStateAction<SignupRequest>>;
  input: SignupRequest;
}) {
  const [pwcheck, setpwCheck] = useState('');

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

  async function handleRegister() {
    const response = await apiSignup({ ...input  } as SignupRequest);
    
      if (response.status === "SUCCESS") {
        window.alert('회원가입이 완료되었습니다.');
        nextStep();
      } else {
        window.alert('회원가입에 실패했습니다.');
      }
  }


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
        errorMessage={input.password !== pwcheck || pwcheck === '' ? "비밀번호가 일치하지 않습니다" : ""}
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
        id="student_id"
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
          <Button id="degree" kind={input.degree === "MASTER" ? "filled" : "outline"} variant="contained" color="primary" onClick={() => setInput((input : SignupRequest) => {
            return { ...input, degree: "MASTER" };
            })} >
            <span className="text-xl" style={{ margin: '5px 30px' }} >
              석사
            </span>
          </Button>
          <Button id="degree" kind={input.degree === "DOCTOR" ? "filled" : "outline"} variant="contained" color="primary" onClick={() => setInput((input : SignupRequest) => {
            return { ...input, degree: "DOCTOR" };
            })}>
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
    </HStack>
  );
}