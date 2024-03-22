import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

import { User } from '../../models/user';

export function MainPage() {
  /**
   * user 상태(state)를 선언했습니다.
   * 이 state는 User 타입이며, 초기값은 아래와 같습니다.
   */
  const [user, setUser] = useState<User>({
    id: 0,
    firstName: '이웹',
    lastName: '케',
    age: 21,
  });

  /**
   * 백엔드 서버에 요청을 보내서 유저 정보를 가져오는 함수입니다.
   * 이런 api호출하는데 axios 라이브러리를 많이 사용합니다.
   * 서버와 통신하는데 시간이 걸리기 때문에 비동기 함수(async)로 선언했습니다.
   * 비동기 함수는 항상 try-catch문으로 감싸주는 것이 좋습니다. (에러가 발생할 수 있기 때문에)
   */
  async function getUser() {
    try {
      /**
       * process.env 는 환경변수를 의미합니다
       * .env 파일에 REACT_APP_API_URL 이라는 변수를 선언했기 때문에 이런식으로 불러올 수 있습니다.
       * 실행되는 환경(개발이냐 라이브냐)에 따라 달라지는 값이거나, 보안이 필요한 값들은 .env 파일에 넣어두고 불러와서 사용합니다.
       * .env 파일은 git에 올라가지 않습니다.(지금은 교육용으로 올려놨습니다)
       * .env 파일은 .gitignore에 등록되어 있습니다.
       *
       * axios.get()은 여러 값들을 반환하지만, 우리는 data, status만 사용할 것입니다.
       * data라는 이름은 너무 추상적이기 때문에 userResponse라는 이름으로 사용합니다.
       */
      const { data: userResponse, status } = await axios.get(`${process.env.REACT_APP_API_URL}/user?id=1`);
      if (status === 200) {
        /**
         * status가 200이라는 것은 서버로부터 제대로 데이터를 받아왔다는 것이므로, 우리는 user 상태를 업데이트해줍니다.
         */
        setUser(userResponse);
      } else {
        // 실패한 경우, 에러를 발생시킵니다.
        // 이러면 아래의 catch문으로 넘어갑니다.
        throw new Error();
      }
    } catch {
      /**
       * 모종의 이유로 api 호출에 실패한 경우, 에러를 콘솔에 출력합니다. (실제 사용자에게는 보이지 않습니다.)
       */
      console.error('유저 정보를 가져오는데 실패했습니다.');
    }
  }

  /**
   * useEffect는 컴포넌트가 렌더링 될 때마다 실행되는 함수입니다.
   * 두번째 인자로 빈 배열을 넣어주면, 컴포넌트가 처음 렌더링 될 때만 실행됩니다.
   * 이런식으로 사용하면, 컴포넌트가 처음 렌더링 될 때만 실행되는 코드를 작성할 수 있습니다.
   * (처음 렌더링 될 때만 실행되는 코드는 보통 api 호출 코드입니다.) -> api 호출은 렌더링된 후 딱 한 번만 실행해야 합니다.
   * api 호출하는 액션 자체만으로 프론트나 백엔드나 성능이 저하됩니다.
   *
   * deps(=의존성) 배열이 빈 배열이므로 첫 렌더링 때만 실행됩니다.
   * 만약 의존성 배열에 어떠한 변수나 상태를 넣어주면, 해당 변수나 상태가 변경될 때마다 실행됩니다. -> 상황에 따라 유용하게 사용할 수 있습니다.
   */
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box paddingX={3} paddingY={5}>
      <Box>
        <Typography variant="h4">사용자 정보</Typography>
      </Box>
      <Box height={40} />
      <Box>
        <Typography variant="h6">이름: {user.firstName}</Typography>
        <Typography variant="h6">성: {user.lastName}</Typography>
        <Typography variant="h6">나이: {user.age}</Typography>
      </Box>
    </Box>
  );
}
