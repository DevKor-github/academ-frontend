import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Stack, TextField, ToggleButton, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useSessionId } from '../../contexts/SessionIdContext';
import { VStack } from '../../components/VStack';
import Spacer from '../../components/Spacer';
import { HStack } from '../../components/HStack';

import styles from './index.module.css';

export function LoginPage() {
  const [input, setInput] = useState({
    id: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setSessionId } = useSessionId();

  const [saveLoginInfo, setSaveLoginInfo] = useState(false);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  }

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
    }
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.modal}>
        <HStack>
          <VStack>
            <Spacer />
            <IconButton onClick={() => navigate(-1)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </VStack>

          <HStack>
            <TextField required id="id" label="ID" onChange={handleInput} />
            <TextField required id="firstName" type="password" label="비밀번호" onChange={handleInput} />
          </HStack>
          <Stack spacing={3} direction="row" justifyContent={'center'}>
            <ToggleButton value="check" selected={saveLoginInfo} onClick={() => setSaveLoginInfo(!saveLoginInfo)}>
              로그인 정보 저장
            </ToggleButton>
            <Spacer />
            <Button variant="contained" color="primary" onClick={handleLogin}>
              비밀번호 찾기
            </Button>
          </Stack>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            로그인
          </Button>
          <VStack>
            아이디가 없으신가요?
            <Button variant="contained" color="primary" onClick={() => navigate('./register')}>
              회원가입
            </Button>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
