import { Button, HStack, A } from '../../components';

interface ErrorPageProps {
  code?: number | string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ErrorPage(errorPageProps: ErrorPageProps) {
  return (
    <HStack>
      <h1>오류가 발생했습니다.</h1>
      <h4>해당하는 리소스를 찾을 수 없습니다.</h4>
      <A abstract href="/">
        <Button>홈 화면으로 이동하기</Button>
      </A>
    </HStack>
  );
}
