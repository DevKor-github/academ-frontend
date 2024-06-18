
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/basic/button";
import Input from "@/components/basic/input";

import { HStack, VStack } from "@/components/basic/stack";

import { RightIcon } from "@/icons";
import { SignupRequest, apiSendEmail } from "@/lib/api/login";

export default function Step1({
  next,
  setInput,
  input,
}: {
  next: () => void;
  setInput: React.Dispatch<SignupRequest>
  input: SignupRequest;
}) {
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@korea\.ac\.kr$/;
    return re.test(String(email).toLowerCase());
  };

  const route = useRouter();

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
  }
  
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  useEffect(() => {
    setIsEmailValid(validateEmail(input.email));
  }, [input.email]);


  async function handleSendEmail() {
    const response = await apiSendEmail({email: input.email});

    if (response.status === "SUCCESS") {
      const id = input.email;
      setInput({ ...input, [input.email]: id.slice(0, -12) });
      next();
    } else {
      window.alert('인증번호 발송을 실패하였습니다. 회원가입을 다시 진행해주십시오.');
      route.push('/login');
    }
  }

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
          onClick={isEmailValid ? next : () => undefined}
        >
          건너뛰기
        </Button>
      </VStack>
    </HStack>
  );
}
