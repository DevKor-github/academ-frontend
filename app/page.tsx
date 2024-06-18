import Carousel from "@/components/commonLayout/carousel/carousel";
import carouselItems from "@/components/commonLayout/carousel/carouselItems";

import Layout from "@/components/commonLayout/commonLayout";

import { HStack, VStack } from '@/components/basic/stack';
import SearchForm from "@/components/composite/SearchForm";

export default function Home() {
  return (
    <Layout highlight="/">
        <HStack className="w-full pb-10" gap="20px">
          <Carousel className="w-full relative bg-neutral-200 transition-all">{carouselItems}</Carousel> 
          <HStack className=" items-center pt-10" gap="10px">
          <span className="font-bold text-3xl text-center">
            어떤 강의를 찾으시나요?
          </span>
          <span className="text-xl text-center">
            강의명, 교수명, 학수번호로 검색해보세요.
          </span>
        </HStack>
        <VStack className="w-full flex justify-center items-center">
            <SearchForm className="w-11/12 md:w-4/6" />
        </VStack>
      </HStack>
    </Layout>
  );
}
