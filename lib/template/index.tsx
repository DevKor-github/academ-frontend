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
    <main>
      <HStack className="pt-24 pb-24 pl-8 pr-8 text-center items-center justify-center">
        <ErrorIllust />
        <HStack className="pb-16" gap="16px">
          <span className="text-6xl font-bold">{title}</span>
          <span className="text-xl whitespace-pre-line">{subtitle}</span>
        </HStack>
        <VStack className="pb-8 justify-center" gap="16px">
          <BackButton />
          <Link href="/">
            <Button>메인 페이지로</Button>
          </Link>
        </VStack>
        <span className="text-xs  text-light-back-4 ">
          이 오류가 버그인 것 같다면{' '}
          <Link className="text-primary-500 underline" href={process.env.NEXT_PUBLIC_BUG_REPORT || ''}>
            버그리포트
          </Link>
          를 부탁드려요.
        </span>
      </HStack>
    </main>
  );
}
