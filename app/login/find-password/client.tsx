'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HStack } from '@/components/basic/stack';

import Button from '@/components/basic/button';
import Input from '@/components/basic/input';
import { apiResetPassword } from '@/lib/api/login';

export default function FindPWPageClient() {
  const [input, setInput] = useState({
    email: '',
  });

  const route = useRouter();


  const [wip, setWip] = useState(false);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  }

  function handleFindPW() {
    //input.email // input.password
    setWip(true);
    apiResetPassword({ email: (input.email.split('@')[0] || '') }).then((s) => {
      if (s.status === 'SUCCESS') {
        alert(s.message);
        route.push('/login');
      } else {
        alert(s.message);
        setWip(false);
      }
    });
  }

  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        handleFindPW();
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
            disabled={wip}
            accnet="0"
            variant="contained"
            color="primary"
            style={{ padding: '16px', width: '100%' }}
          >
            <div>{wip ? "전송 중..." : "비밀번호 초기화" }</div>
          </Button>
        </HStack>
      </HStack>
    </form>
  );
}
