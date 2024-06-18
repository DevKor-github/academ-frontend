import { StarIcon } from '@/icons';
import { HStack, VStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import { Comment } from '@/lib/models/comment';

export default function CommentView({ comment } : { comment : Comment}) {
  return <div
    className='flex flex-col md:flex-row'
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
      className='items-center justify-start flex-nowrap'
      gap="20px"
      style={{
        minWidth: '96px',
        padding: '0px 16px 0px 0px',
        borderRight: '1px solid #b7b7b7',
        flexWrap: 'wrap',
      }}
    >

      <span className='text-4xl font-bold flex flex-row'>
          <StarIcon className='text-primary-500' width="36px" height="36px" />{comment.rating}
      </span>

      <div className='flex flex-row md:flex-col flex-wrap'>
        <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className='text-xl' >학습량</span>
          <Tag>적음</Tag>
        </VStack>
        <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className='text-xl' >성적</span>
          <Tag>적음</Tag>

        </VStack>
        <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className='text-xl' >강의력</span>
          <Tag>적음</Tag>
        </VStack>
        <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className='text-xl'>난이도</span>
          <Tag>적음</Tag>
        </VStack>
      </div>
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
        <span>닉네임 {comment.profile_username}</span>
        <span>작성일 {comment.updated_at}</span>
        
        <Tag>친절한</Tag>
        <Tag>친절한</Tag>
        <Tag>친절한</Tag>
        <Tag>친절한</Tag>
        <Tag>친절한</Tag>
        <Tag>친절한</Tag>
        <Tag>친절한</Tag>
        <Tag>친절한</Tag>
      </VStack>
      <span className='text-xl' style={{ lineHeight: '150%' }}>
        <span style={{ color: 'grey' }}>작성내용</span> {comment.review}
      </span>
    </HStack>
  </div>
    ;
}
