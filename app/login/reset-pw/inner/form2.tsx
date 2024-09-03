'use client';

import { useState } from 'react';

import { HStack } from '@/components/basic/stack';
import Input from '@/components/basic/input';
import Button from '@/components/basic/button';

export default function ResetPwForm2({ input, handleInput, handleSubmit }: FormProps<ResetPwReq, void>) {

  const [wip, setWip] = useState<boolean>(false);
  
  return (<form
    method="post"
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <HStack gap="48px">
      <HStack gap="16px">
        <Input
          required
          id="email"
          placeholder="이메일을 입력해주세요"
          onChange={handleInput}
          value={input.email}
          style={{ padding: '16px' }}
        />
      </HStack>

      <HStack style={{}} gap="20px">
        <Button
          type="submit"
          kind="filled"
          disabled={wip || input.email === ''}
          accnet="0"
          variant="contained"
          color="primary"
          style={{ padding: '16px', width: '100%' }}
        >
          <div>{wip ? "전송 중..." : "비밀번호 초기화"}</div>
        </Button>
      </HStack>
    </HStack>
  </form>);
}