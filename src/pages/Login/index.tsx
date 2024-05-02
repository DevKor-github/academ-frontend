import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import { CloseIcon, LogoIcon } from '../../icons';
import { ignore } from '../../helper';
import { useSessionId } from '../../contexts/SessionIdContext';
import { triggerWhenRendered } from '../../contexts/RenderTriggerContext';
import { VStack, HStack, Toggle, A, Button, Input, TextField, Typography } from '../../components';

export function LoginPage() {
  const [input, setInput] = useState({
    id: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setSessionId } = useSessionId();

  const [saveLoginInfo, setSaveLoginInfo] = useState(false);
  const [loginError, setLoginError] = useState(false);

  triggerWhenRendered();

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
    <Typography variant="t5">
      <HStack type="left" gap="16px" style={{ width: '400px' }}>
        <VStack style={{ justifyContent: 'space-between', paddingBottom: '16px' }}>
          <Button style="blank" onClick={() => navigate('/')}>
            <VStack gap="4px" style={{ justifyContent: 'center', alignItems: 'center', color: 'var(--fore-0)' }}>
              <LogoIcon />
              Academ
            </VStack>
          </Button>

          <Button style="blank" onClick={() => navigate(-1)}>
            <CloseIcon width="16px" height="16px" />
          </Button>
        </VStack>

        <form
          method="post"
          action="/login/api"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <HStack gap="16px">
            <HStack gap="8px">
              <TextField required id="id" placeholder="example@korea.ac.kr" onChange={handleInput} value={input.id} />
              <TextField
                required
                id="password"
                type="password"
                placeholder="비밀번호"
                onChange={handleInput}
                errorMessage={loginError ? '이메일 주소 또는 비밀번호가 일치하지 않습니다.' : ''}
                value={input.password}
              />
            </HStack>

            <VStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Toggle
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

            <Button type="submit" style="filled" accnet="0" variant="contained" color="primary">
              <div>로그인</div>
            </Button>
          </HStack>
        </form>

        <VStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          아이디가 없으신가요?
          <A href="/register">회원가입</A>
        </VStack>
      </HStack>
    </Typography>
  );
}
