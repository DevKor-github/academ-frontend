import Layout from "@/components/commonLayout/commonLayout"

import { HStack, VStack } from "@/components/basic/stack"
import Link from "next/link"
import Button from "@/components/basic/button"

export default function Custom404() {
  return <Layout highlight="">
    <main>
    <HStack className="pt-24 pb-24 pl-8 pr-8 text-center justify-center" gap="64px">
      <HStack gap="16px">
        <span className="text-6xl font-bold">404</span>
        <span className="text-xl">오류가 발생했습니다.<br />해당하는 리소스를 찾을 수 없습니다.</span>
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
    </Layout>
}