import { HStack, VStack } from "@/components/basic/stack"
import Link from "next/link"
import Button from "@/components/basic/button"

export default function WriteError({ code }: {code : number}) {
  return <main>
    <HStack className="pt-24 pb-24 pl-8 pr-8 text-center justify-center" gap="64px">
      <HStack gap="16px">
        <span className="text-6xl font-bold">!</span>
        <span className="text-xl">강의평을 작성할 수 없습니다. 다음의 상태 코드와 함께 실패하였습니다 : {code}</span>
      </HStack>
        <VStack className="justify-center" gap="16px">
        <Link href="/report">
          <Button>문의하기</Button>
        </Link>
        <Link href="/">
          <Button>메인 페이지로</Button>
        </Link>
      </VStack>
    </HStack>
    </main>
}