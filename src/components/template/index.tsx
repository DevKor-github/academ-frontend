import { HStack, VStack } from '@/components/basic/stack';
import Link from 'next/link';
import Button from '@/components/basic/button';
import BackButton from './backbutton';
import ErrorIllust from './inner/erroricon';

export default function ErrorTemplate({
  title,
  subtitle,
  // back
}: {
  title: string;
  subtitle: string;
  back?: string;
}) {
  return (
    <HStack className="pt-24 pb-24 pl-8 pr-8 text-center items-center justify-center">
      <ErrorIllust />
      <HStack className="pb-16 gap-y-4">
        {/* <span className="text-6xl font-bold">{title}</span> */}
        <span className="text-2xl font-semibold whitespace-pre-line text-balance">{subtitle}</span>
      </HStack>
      <VStack className="pb-8 justify-center gap-x-4">
        <BackButton />
        <Link href="/">
          <Button>메인 페이지로</Button>
        </Link>
      </VStack>
      <span className="text-xs text-base-20 ">
        이 오류가 버그인 것 같다면{' '}
        <Link className="text-primary-500 underline" href={process.env.NEXT_PUBLIC_BUG_REPORT || ''}>
          버그리포트
        </Link>
        를 부탁드려요.
      </span>
    </HStack>
  );
}

export function ErrorLogintemplate({
  title,
  subtitle,
  // back
}: {
  title: string;
  subtitle: string;
  back?: string;
}) {
  return (
    <HStack className="pt-24 pb-24 pl-8 pr-8 text-center items-center justify-center">
      <ErrorIllust />
      <HStack className="pb-16 gap-y-4">
        {/* <span className="text-6xl font-bold">{title}</span> */}
        <span className="text-2xl font-semibold whitespace-pre-line text-balance">{subtitle}</span>
      </HStack>
      <VStack className="pb-8 justify-center gap-x-4">
        <BackButton />
        <Link href="/login">
          <Button>로그인하기</Button>
        </Link>
      </VStack>
      <span className="text-xs text-base-20 ">
        이 오류가 버그인 것 같다면{' '}
        <Link className="text-primary-500 underline" href={process.env.NEXT_PUBLIC_BUG_REPORT || ''}>
          버그리포트
        </Link>
        를 부탁드려요.
      </span>
    </HStack>
  );
}
