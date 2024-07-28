import { VStack, HStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import Skeleton from '@/components/composite/skeleton';

export default function CommentReportLoading() {
  return (
    <HStack className="w-full h-full">
      <VStack
        className={` pl-8 pr-8 border-b-black bg-neutral-50 dark:bg-neutral-950`}
        style={{
          paddingTop: '160px',
          paddingBottom: '60px',
          justifyItems: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
        gap="24px"
      >
        <div
          style={{
            height: '80px',
            width: '80px',
            aspectRatio: 1,
            borderRadius: '52px',
            background: '#d9d9d9',
          }}
        />
        <HStack gap="10px">
          <VStack gap="10px" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="text-3xl">
              <Skeleton placeholder="강의 이름 이름" />
            </span>
            <Tag className="bg-primary-100 text-primary-900 opacity-50">
              <Skeleton placeholder="강의평 n개" />
            </Tag>
          </VStack>
          <VStack gap="20px" style={{ flexWrap: 'wrap' }}>
            <span className="text-lg">
              <Skeleton placeholder="교수명" />
            </span>
            <span className="text-lg">
              <Skeleton placeholder="강의관리번호" />
            </span>
            <span className="text-lg">
              <Skeleton placeholder="강의년도" />
            </span>
            <span className="text-lg">
              <Skeleton placeholder="학기" />
            </span>
            <span className="text-lg">
              <Skeleton placeholder="요일 교시 강의 장소 텍스트" />
            </span>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
