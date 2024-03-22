import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, Stack, Typography } from '@mui/material';

import { User } from '../../models/user';

/**
 * 전체적인 구조는 MainPage와 비슷합니다. (MainPage를 먼저 보고 오세요)
 * 여기서는 user 한 명이 아닌, 배열로 받습니다.
 * 배열로 받을 때도 크게 다르진 않지만, map 함수를 사용해서 배열을 적절하게 렌더링해줘야 합니다.
 */
export function ListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const { age } = useParams();

  async function getUsers() {
    try {
      const { data: userResponse, status } = await axios.get(`${process.env.REACT_APP_API_URL}/user/${age}`);
      if (status === 200) {
        setUsers(userResponse);
      } else {
        throw new Error();
      }
    } catch {
      console.error('유저 정보를 가져오는데 실패했습니다.');
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  /**
   * user.map 을 실행하고 있습니다.
   * js에서도 for, while 반복문이 있기는 하지만 금기시하고 있습니다.
   * 대신에 map, filter, reduce 등의 메서드를 사용합니다.
   * for, while보다 더 간결하고, 가독성이 좋습니다.
   * 특히 map은 배열을 렌더링할 때 많이 사용합니다. 매우 중요!!
   */
  return (
    <Box paddingX={3} paddingY={5}>
      <Box>
        <Typography variant="h4">04년생 목록</Typography>
      </Box>
      <Box mt={4}>
        <Stack spacing={4}>
          {users.map((user) => (
            <UserCard key={user.id} firstName={user.firstName} lastName={user.lastName} age={user.age} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

/**
 * 이런식으로 mui를 사용해도 커스텀 컴포넌트를 만들어서 사용할 수 있습니다.
 * interface를 사용해서 props의 타입을 정해줄 수 있습니다.
 */
interface UserCardProps {
  firstName: string;
  lastName: string;
  age: number;
}
function UserCard({ firstName, lastName, age }: UserCardProps) {
  return (
    <Card>
      <Box padding={2}>
        <Typography variant="h6">
          이름: {lastName} {firstName}
        </Typography>
        <Typography variant="h6">나이: {age}</Typography>
      </Box>
    </Card>
  );
}
