import { useRouter } from 'next/navigation';
import { FinishIcon } from '@/icons';
import { HStack } from '@/components/basic/stack';
import Button from '@/components/basic/button';

export default function Step4() {
  const route = useRouter();

  return (
    <HStack gap="25px" className="items-center">
      <FinishIcon />
      <span className="text-4xl font-medium">회원가입 완료!</span>
      <Button
        kind="filled"
        className="w-full mt-20 text-2xl"
        variant="contained"
        color="primary"
        onClick={() => route.push('/login')}
      >
        로그인 화면으로
      </Button>
    </HStack>
  );
}
