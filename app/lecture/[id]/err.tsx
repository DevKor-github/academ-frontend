"use client";

import { HStack, VStack } from "@/components/basic/stack"
import Link from "next/link"
import Button from "@/components/basic/button"

export default function LectureError() {
  return <main>
    <HStack className="pt-24 pb-24 pl-8 pr-8 text-center justify-center" gap="64px">
      <HStack gap="16px">
        <span className="text-6xl font-bold">404</span>
        <span className="text-xl">해당하는 강의를 불러올 수 없습니다.<br />강의가 없습니다.</span>
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