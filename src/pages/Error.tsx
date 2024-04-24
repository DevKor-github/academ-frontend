import { Link } from 'react-router-dom';

import { Button, HStack, Spacer, VStack, Typography } from '../components';

interface ErrorPageProps {
  code?: number | string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ErrorPage(errorPageProps: ErrorPageProps) {
  return (
    <HStack gap="32px">
      <HStack gap="16px">
        <Typography variant="t1">오류가 발생했습니다.</Typography>
        <Typography variant="t5">해당하는 리소스를 찾을 수 없습니다.</Typography>
      </HStack>
      <VStack gap="16px">
        <Spacer />
        <Link to="/report">
          <Button>문의하기</Button>
        </Link>
        <Link to="/">
          <Button>메인 페이지로</Button>
        </Link>
      </VStack>
    </HStack>
  );
}
