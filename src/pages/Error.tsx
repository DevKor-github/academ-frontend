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

function ErrorLackOfPermissionPage({ code }: ErrorPageProps) {
  return (
    <HStack gap="32px">
      <HStack gap="16px">
        <Typography variant="t1">권한이 부족합니다.</Typography>
        <Typography variant="t5">이 페이지는 {code}만 사용할 수 있습니다.</Typography>
      </HStack>
      <VStack gap="16px">
        <Spacer />
        <Link to="/login">
          <Button>로그인</Button>
        </Link>
        <Link to="/">
          <Button>메인 페이지로</Button>
        </Link>
      </VStack>
    </HStack>
  );
}

export function ErrorLoginRequiredPage() {
  return <ErrorLackOfPermissionPage code="로그인한 사용자" />;
}
