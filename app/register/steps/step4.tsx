import { useRouter } from "next/router";
import { FinishIcon } from "@/icons";
import { HStack } from "@/components/basic/stack";
import Button from "@/components/basic/button";

export default function Step4() {

  const route = useRouter();

  return (
    <HStack gap="20px">
      <FinishIcon />
      <span className="text-xl">회원가입 완료!</span>
      <Button
        kind="filled"
        className="styles.fullWidth"
        variant="contained"
        color="primary"
        onClick={() => route.push('/login')}
      >
        로그인 화면으로
      </Button>
    </HStack>
  );
}