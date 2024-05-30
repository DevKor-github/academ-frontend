import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import { ignore } from '../../helper';
import { useSessionId } from '../../contexts/SessionIdContext';
import { VStack, HStack, Radio, A, Button, Input, TextField, Typography } from '../../components';

export function LoginPage() {
  const [input, setInput] = useState({
    id: '',
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
        marginInline: '40px',
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
                id="id"
                placeholder="이메일을 입력해주세요"
                onChange={handleInput}
                value={input.id}
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
                disabled={input.id === '' && input.password === ''}
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
