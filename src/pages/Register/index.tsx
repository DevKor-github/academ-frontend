import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';

/**
 * 유저 생성 페이지입니다.
 * 회원가입을 위한 정보를 입력받습니다.
 * 회원가입 버튼을 누르면 백엔드 서버에 회원가입 요청을 보냅니다.
 */
export function RegisterPage() {
  const [input, setInput] = useState({
    lastName: '',
    firstName: '',
    age: 0,
  });

  const navigate = useNavigate();

  /**
   * 아래에서 Textfield의 값을 변경할 때 사용하는 함수입니다.
   * Textfield의 값을 변경할 때마다 함수가 실행됩니다.
   * input state를 변경하고 있습니다.
   */
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    /**
     * type이 number인 경우, event.target.value는 기본적으로 string이므로 Number() 함수를 사용해서 숫자로 변환해줍니다.
     */
    const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;

    setInput({
      ...input,
      [event.target.id]: value,
    });
  }

  /**
   * 회원가입 버튼을 클릭하면 발생하는 함수입니다.
   * 백엔드 서버에 회원가입 요청을 보냅니다.
   * 회원가입이 완료되면 메인 페이지로 이동합니다.
   * 상태코드 201은 생성 성공을 의미합니다.
   * navigate('주소')는 해당 주소로 이동하는 함수입니다.
   * 참고로, navigate(-1)은 이전 페이지로 이동하는 함수입니다.
   */
  async function handleRegister() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        window.alert('회원가입이 완료되었습니다.');
        navigate('/');
      }
    } catch (e) {
      window.alert('회원가입에 실패했습니다.');
    }
  }

  /**
   * TextField 컴포넌트는 HTML input 태그를 감싼 컴포넌트입니다.
   * onChange에 함수를 넣어주면, input 태그의 값이 변경될 때마다(한 글자 입력할 때마다) 함수가 실행됩니다.
   * 함수의 이름만 써야 합니다. handleInput() 이렇게 쓰면 안됩니다.
   * handleInput함수에 event 객체를 자동으로 넣어서 실행합니다.
   */
  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h4">회원 가입</Typography>
      </Box>
      <Box>
        <Box marginY={2}>
          <Divider />
        </Box>
        <Stack spacing={2}>
          <TextField required id="lastName" label="성" onChange={handleInput} />
          <TextField required id="firstName" label="이름" onChange={handleInput} />
          <TextField required id="age" label="나이" type="number" onChange={handleInput} />
        </Stack>
      </Box>
      <Box paddingY={6}>
        <Stack spacing={3} direction="row" justifyContent={'center'}>
          {/* navigate(-1)은 뒤로가기와 같습니다. */}
          {/* 함수가 간단하다면 () => handler() 형태로 간단하게 넣을 수 있습니다. */}
          <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
            이전
          </Button>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            회원 가입
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
