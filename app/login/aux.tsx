

import A from '@/components/basic/a';
import { HStack, VStack } from '@/components/basic/stack';

import Button from '@/components/basic/button';
import Input from '@/components/basic/input';
import Radio from '@/components/basic/radio';

export default function LoginPageLoading() {

  return (
    <form
      method="post"
    >
      <HStack gap="48px">
        <HStack gap="16px">
          <input
            // required
            id="email"
            placeholder="이메일을 입력해주세요"
            disabled
            defaultValue=''
            style={{ padding: '16px' }}
          />
          <input
            // required 
            disabled
            defaultValue=''
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            style={{ padding: '16px' }}
          />

          <VStack className="pt-4 pb-4 items-center justify-between">
            <Radio
              id="save"
              value={false}
              label="로그인 정보 저장"
            />
            <A href="/login/reset-password">비밀번호 초기화</A>
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
  );
}
