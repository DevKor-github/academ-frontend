import { StarIcon } from '@/icons';
import { VStack, HStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';

export default function CommentView() {
  return (
    <VStack
      style={{
        background: 'white',
        marginTop: '10px',
        padding: '32px',
        border: '1px solid #b7b7b7',
        borderRadius: '20px',
        // flexWrap: 'wrap',
        gap: '24px',
      }}
    >
      <VStack
        gap="20px"
        style={{
          minWidth: '96px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 16px 0px 0px',
          borderRight: '1px solid #b7b7b7',
          flexWrap: 'wrap',
        }}
      >
        <VStack
          gap="5px"
          style={{
            minWidth: 'fit-content',
            alignItems: 'center',
            fill: 'var(--accent)',
          }}
        >
          <StarIcon width="24px" height="24px" />
          <span className='text-xl' children="5.0" />
        </VStack>
        <HStack gap="8px">
          <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <span className='text-xl'  children="학습량" />
            <Tag children="적음" />
          </VStack>
          <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <span className='text-xl'  children="성적" />
            <Tag children="적음" />
          </VStack>
          <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <span className='text-xl'  children="강의력" />
            <Tag children="적음" />
          </VStack>
          <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <span className='text-xl'  children="난이도" />
            <Tag children="적음" />
          </VStack>
        </HStack>
      </VStack>
      <HStack gap="8px">
        {/* style={{ padding: '0px 0px 0px 16px' }} */}
        <VStack
          style={{
            overflow: 'hidden',
            height: 'min-content',
            flexWrap: 'wrap',
            gap: '4px',
          }}
        >
          {/* <span>닉네임 양양쥐 작성일 2024/04/19</span> */}
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
        </VStack>
        <span className='text-xl'  style={{ lineHeight: '150%' }}>
          <span style={{ color: 'grey' }}>작성내용</span> 아주 좋은강의였습니다 교수님이 매우 착하십니다 난이도도 낮아서
          크게 스트레스 받지않을거같네요! 과제에대해서한가지팁을드..
        </span>
      </HStack>
    </VStack>
  );
}
