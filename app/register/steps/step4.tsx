import { useRouter } from 'next/navigation';
import { FinishIcon } from '@/component/icon';
import { HStack } from '@/component/basic/stack';
import Button from '@/component/basic/button';

import { LastImg } from './resultilust';

export default function Step4() {
  const route = useRouter();

  return (
    <HStack gap="25px" className="items-center">
      <FinishIcon />
      <span className="text-4xl font-medium">회원가입 완료!</span>
      <span>
        회원가입 후 한 달간은 열람권 없이
        <br />
        모든 강의평을 자유롭게 작성할 수 있습니다.
      </span>
      <LastImg />
      <span>
        내가 수강한 강의의 평가를 작성하고 포인트를 미리 적립해,
        <br />
        이번 학기 내내 서비스를 끊김 없이 이용하세요!
      </span>
      <Button
        kind="filled"
        className="w-full mt-6 text-2xl"
        variant="contained"
        color="primary"
        onClick={() => route.push('/login')}
      >
        로그인 화면으로
      </Button>
    </HStack>
  );
}
