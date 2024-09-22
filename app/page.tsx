import Carousel from '@/component/commonLayout/carousel/carousel';
import carouselItems from '@/component/commonLayout/carousel/carouselItems';

import SearchForm from '@/component/composite/SearchForm';

export default function Home() {
  return (
    <div className="flex flex-col gap-y-5 w-full h-full pb-10 light:bg-base-32 dark:bg-base-2">
      <Carousel className="w-full relative transition-all">{carouselItems}</Carousel>
      <div className="flex flex-col gap-y-2 items-center pt-10">
        <span className="font-bold text-3xl text-center">어떤 강의를 찾으시나요?</span>
        <span className="text-xl text-center">강의명, 교수명, 학수번호로 검색해보세요.</span>
      </div>
      <div className="w-full flex justify-center items-center">
        <SearchForm className="w-11/12 md:w-4/6" />
      </div>
    </div>
  );
}
