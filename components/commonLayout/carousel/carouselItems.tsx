import Link from 'next/link';

import Image from 'next/image';

import { HStack, VStack } from '@/components/basic/stack';
import { BookIcon } from '@/lib/icons';

export function CarouselItem({ url, children }: { url: string; children?: React.ReactNode }) {
  return (
    <div
      className={`flex justify-center items-center dark h-full relative`}
      style={{ backgroundColor: 'black', minWidth: '100%' }}
    >
      <Image
        className="absolute z-10 animate-fade-slow"
        loading="eager"
        src={url}
        alt="banner image"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
      <div className="z-10 size-full flex justify-center items-center pt-20">{children}</div>
    </div>
  );
}

const carouselItems = [
  <CarouselItem key={'/banner/image1.png'} url="/banner/image1.png">
    <HStack
      className="p-4 text-white justify-start items-start pt-10 h-full"
      gap="24px"
      style={{ width: '40rem', height: '10rem' }}
    >
      <VStack className=" items-center" gap="12px">
        <span className=" text-5xl font-bold">ACADEM</span>
        <span className="text-lg border-l border-l-neutral-50 pl-3">아카뎀</span>
      </VStack>
      <VStack gap="24px" style={{ alignItems: 'center' }}>
        <span className="text-lg leading-noraml">
          대학원생을 위한 <span className="font-bold">강의평가 공유 서비스</span>
          <span className="md:hidden">, </span>
          <br className="not-md:hidden" />
          우리 학교 강의에 대한 다양한 정보와 이야기를 나누어요.
        </span>
        <Link href="/notice/detail/0">
          <button className="rounded-lg border border-white p-2">자세히보기</button>
        </Link>
      </VStack>
    </HStack>
  </CarouselItem>,
  <CarouselItem key={'/banner/image2.png'} url="/banner/image2.png">
    <HStack className="p-4 text-white justify-center items-center pt-10 h-full" gap="24px" style={{ width: '40rem' }}>
      <span className="text-2xl">
        <span className="font-bold">이론 중심</span>
        {' 강의? '}
        <span className="font-bold">실험 중심</span>
        {' 강의? '}
      </span>
      <span className="text-4xl">어떤 강의가 나의 연구에 도움이 될까?</span>
      <span className="text-lg">
        <BookIcon /> <span>강의 간의 비교를 통해 나의 학업에 도움이 되는 강의를 선택하세요.</span>
      </span>
    </HStack>
  </CarouselItem>,
  <CarouselItem key={'/banner/image3.png'} url="/banner/image3.png">
    <HStack
      className="p-4 text-white justify-start items-start pt-10 h-full"
      gap="24px"
      style={{ width: '40rem', height: '10rem' }}
    >
      <span className="text-3xl">
        <span className="font-bold">문제 출제 유형</span>과 <span className="font-bold">기출</span>을 한눈에
      </span>
      <span className="text-lg">
        <BookIcon /> 수업 및 시험 방식에 대한 정보를 얻고 <span className="font-bold">효율적으로 시험을 준비</span>할 수
        있어요.
      </span>
    </HStack>
  </CarouselItem>,
];

export default carouselItems;
