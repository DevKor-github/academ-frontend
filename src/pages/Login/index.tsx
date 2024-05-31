import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import qs from 'qs';

import { ignore } from '../../helper';
import { useSessionId } from '../../contexts/SessionIdContext';
import { VStack, HStack, Radio, A, Button, Input, TextField, Typography } from '../../components';
import { backend } from '../../api/backend';

export function LoginPage() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setSessionId } = useSessionId();

  const [saveLoginInfo, setSaveLoginInfo] = useState(false);
  const [loginError, setLoginError] = useState(false);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  }

  ignore(Input, loginError);

  async function handleLogin() {
    try {
      const response = await backend.post(
        '/api/login',
        qs.stringify({ email: input.email, password: input.password, 'remember-me': false }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      console.log(response.config);
      console.log(response.data);
      console.log(response.headers);
      console.log(response.request);
      console.log(response.status);
      console.log(response.statusText);

      if (response.status === 200) {
        window.alert('로그인이 완료되었습니다.');
        setSessionId('sesssionId from backend server');
        navigate('/');
      }
    } catch (e) {
      window.alert('로그인에 실패했습니다.');
      setLoginError(true);
    }
  }

  return (
    <Typography
      variant="t5"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        height: '100%',
        width: '100%',
      }}
    >
      <HStack type="left" gap="48px" style={{ width: '400px' }}>
        <Typography bold variant="t1" style={{ textAlign: 'center' }}>
          로그인
        </Typography>

        <form
          method="post"
          action="/login/api"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <HStack gap="48px">
            <HStack gap="16px">
              <TextField
                required
                id="email"
                placeholder="이메일을 입력해주세요"
                onChange={handleInput}
                value={input.email}
                style={{ padding: '16px' }}
              />
              <TextField
                required
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handleInput}
                errorMessage={loginError ? '이메일 주소 또는 비밀번호가 일치하지 않습니다.' : ''}
                value={input.password}
                style={{ padding: '16px' }}
              />
              <VStack style={{ justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <Radio
                  value={saveLoginInfo}
                  onClick={
                    (/* event: React.FormEvent<HTMLDivElement> */) => {
                      // event.stopPropagation();
                      setSaveLoginInfo(!saveLoginInfo);
                    }
                  }
                  label="로그인 정보 저장"
                />
                <A href="/login/find-password">비밀번호 찾기</A>
              </VStack>
            </HStack>

            <HStack style={{}} gap="20px">
              <Button
                type="submit"
                kind="filled"
                disabled={input.email === '' && input.password === ''}
                accnet="0"
                variant="contained"
                color="primary"
                style={{ padding: '16px', width: '100%' }}
              >
                <div>로그인</div>
              </Button>
              <Typography variant="t5" style={{ textAlign: 'center' }}>
                계정이 없으신가요? <A href="/register">회원가입</A>
              </Typography>
            </HStack>
          </HStack>
        </form>
      </HStack>
    </Typography>
  );
}
