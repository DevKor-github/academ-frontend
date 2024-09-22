import { HStack } from '@/component/basic/stack';
import Input from '@/component/basic/input';
import ErrorLabel from '@/component/basic/errorlabel';
import { VStack } from '@/component/basic/stack';
import Radio from '@/component/basic/radio';
import A from '@/component/basic/a';
import Button from '@/component/basic/button';
import Spinner from '@/component/basic/spinner';

interface LoginErrors {
  shake: boolean;
  loginError: string;
}

export default function LoginForm({
  input,
  handleInput,
  handleSubmit,
  submitting,
  loginError,
  shake,
}: FormProps<LoginRequest> & LoginErrors) {
  return (
    <span
      className="text-xl"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        height: '100%',
        width: '100%',
      }}
    >
      <HStack className="text-lg" gap="48px" style={{ width: '400px' }}>
        <span className="text-4xl" style={{ textAlign: 'center' }}>
          로그인
        </span>
        <form method="post" onSubmit={handleSubmit}>
          <HStack gap="48px">
            <HStack gap="16px">
              <Input
                id="email"
                readOnly={handleInput === undefined}
                placeholder="이메일을 입력해주세요"
                onChange={handleInput}
                value={input.email}
                style={{ padding: '16px' }}
              />
              <Input
                readOnly={handleInput === undefined}
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handleInput}
                value={input.password}
                style={{ padding: '16px' }}
              />
              <ErrorLabel className="text-primary-500" label={loginError} shake={shake} />

              <VStack className="pt-4 pb-4 items-center justify-between">
                <>
                  <div className="hidden">
                    <Radio
                      id="remember-me"
                      readOnly={handleInput === undefined}
                      value={input['remember-me']}
                      onChange={handleInput}
                      label="로그인 정보 저장"
                    />
                  </div>
                  <div />
                </>
                <A href="/login/reset-pw">비밀번호 초기화</A>
              </VStack>
            </HStack>

            <HStack style={{}} gap="20px">
              <Button
                type="submit"
                kind="filled"
                disabled={(input.email === '' && input.password === '') || submitting}
                accnet="0"
                variant="contained"
                color="primary"
                style={{ padding: '16px', width: '100%' }}
              >
                {submitting ? (
                  <span>
                    <Spinner /> 처리 중...
                  </span>
                ) : (
                  <div>로그인</div>
                )}
              </Button>
              <span style={{ textAlign: 'center' }}>
                계정이 없으신가요? <A href="/register">회원가입</A>
              </span>
            </HStack>
          </HStack>
        </form>
      </HStack>
    </span>
  );
}
