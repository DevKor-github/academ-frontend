import { useState } from "react";
import { SignupRequest, apiSendEmail } from "@/lib/api/login";
import { HStack, VStack } from "@/components/basic/stack";
import { RightIcon } from "@/icons";
import TextField from "@/components/basic/textfield";
import Button from "@/components/basic/button";


export default function Step2({
  next,
  input,
}: {
  next : () => void,
  input: SignupRequest;
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
        next();
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
      <VStack>
        현재 이메일 전송 API 버그가 있어 디버그를 위해 건너뛰기 기능을 제공하는 중입니다.
        <Button
          onClick={next}
        >
          건너뛰기
        </Button>
      </VStack>
    </HStack>
  );
}