import { HStack, VStack } from '@/components/basic/stack';

import Radio from '@/components/basic/radio';
import Button from '@/components/basic/button';
import TextField from '@/components/basic/textfield';
import A from '@/components/basic/a';

import dynamic from 'next/dynamic';

function LoginFormLoading() {
  return <form
  method="post"
>
  <HStack gap="48px">
    <HStack gap="16px">
      <TextField
        required
        id="email"
        placeholder="이메일을 입력해주세요"
        value=""
        style={{ padding: '16px' }}
      />
      <TextField
        required
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        errorMessage=""
        value={""}
        style={{ padding: '16px' }}
      />
      <VStack className='pt-4 pb-4 items-center justify-between'>
        <Radio
          id="save"
          value={false}
          label="로그인 정보 저장"
        />
        <A href="/login/find-password">비밀번호 찾기</A>
      </VStack>
    </HStack>

    <HStack style={{}} gap="20px">
      <Button
        type="submit"
        kind="filled"
        disabled={true}
        accnet="0"
        variant="contained"
        color="primary"
        style={{ padding: '16px', width: '100%' }}
      >
        <div>로그인</div>
      </Button>
      <span style={{ textAlign: 'center' }}>
        계정이 없으신가요? <A href="/register">회원가입</A>
      </span>
    </HStack>
  </HStack>
</form>
}

const LoginForm = dynamic(() => import('./client'), { ssr: false, loading: LoginFormLoading });

export default function LoginPage() {

  return (
    <span
    className='text-xl' 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        height: '100%',
        width: '100%',
      }}
    >
      <HStack
          className='text-lg'
          gap="48px" style={{ width: '400px' }}>
        <span  className='text-4xl' style={{ textAlign: 'center' }}>
          로그인
        </span>
        <LoginForm />
      </HStack>
    </span>
  );
}