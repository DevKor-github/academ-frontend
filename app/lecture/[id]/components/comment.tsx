"use client";

import { Star1 } from '@/components/composite/starIndicator';
import { HStack, VStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import Button from '@/components/basic/button';
import { Comment } from '@/lib/models/comment'
import { useState } from 'react';

import { useApiStartUpdateComment, apiDeleteComment } from '@/lib/api/course';

import Link from 'next/link';
import { useSessionId } from '@/context/SessionIdContext';

function quaternary<T>(that : number, standard : number, gt: T, eq: T, lt: T) {
  if (that === standard) {
    return eq;
  }
  else if (that > standard) {
    return gt;
  }
  return lt;
}

function getTag(comment: Comment) {
  return [
    (comment.teach_t1_theory ? ["이론 수업"] : []),
    (comment.teach_t2_practice ? ["실습 수업"] : []),
    (comment.teach_t3_seminar ? ["세미나형 수업"] : []),
    (comment.teach_t4_discussion ? ["토론형 수업"] : []),
    (comment.teach_t5_presentation ? ["발표"] : []),
    (comment.learn_t1_theory ? ["지식 습득에 도움"] : []),
    (comment.learn_t2_thesis ? ["논문 작성에 도움"] : []),
    (comment.learn_t3_exam ? ["시험 대비에 도움"] : []),
    (comment.learn_t4_industry ? ["현업 적용에 도움"] : []),
  ].flat(1);
}


function Left({ comment }: { comment: Comment }) {
  return <HStack
    className='items-center justify-start flex-nowrap md:border-r md:border-r-neutral-200 md:pr-4'
    gap="20px"
    style={{
      minWidth: '96px',
      padding: '0px 16px 0px 0px',
      flexWrap: 'wrap',
    }}
  >

    <span className='text-4xl font-bold flex flex-row'>
      <Star1 rate={comment.rating / 5} px={36} />{comment.rating}
    </span>

    <div className='flex flex-row md:flex-col flex-wrap'>
      <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className='text-xl' >학습량</span>
        <Tag>{quaternary(comment.r1_amount_of_studying, 3, "많음", "보통", "적음")}</Tag>
      </VStack>
      <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className='text-xl' >성적</span>
        <Tag>{quaternary(comment.r2_difficulty, 3, "많음", "보통", "적음")}</Tag>
      </VStack>
      <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className='text-xl' >강의력</span>
        <Tag>{quaternary(comment.r3_delivery_power, 3, "많음", "보통", "적음")}</Tag>
      </VStack>
      <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <span className='text-xl'>난이도</span>
        <Tag>{quaternary(comment.r4_grading, 3, "높음", "중간", "낮음")}</Tag>
      </VStack>
    </div>
  </HStack>;
}

function Right({ editable, comment, setDel }: { editable: boolean, comment: Comment, setDel : React.Dispatch<boolean> }) {
  return <HStack className='w-full h-full' gap="8px">
    {/* style={{ padding: '0px 0px 0px 16px' }} */}
    <VStack
      style={{
        overflow: 'hidden',
        height: 'min-content',
        flexWrap: 'wrap',
        gap: '4px',
      }}
    >
      <span>닉네임 {comment.username}</span>
      <span>작성일 {comment.updated_at}</span>
    
      {getTag(comment).flatMap((v, i) => <Tag key={i}>{v}</Tag>)}
    </VStack>
    <span className='text-xl flex-grow' style={{ lineHeight: '150%', lineBreak: 'anywhere' }}>
      <span style={{ color: 'grey' }}>작성내용</span> {comment.review}
    </span>
    <VStack className='self-end' gap='4px'>
      {
        editable ?
          <>
            <Link href={`/edit/${comment.comment_id}`}>
            <Button kind='blank'>수정</Button>
            </Link>
            <Button kind='blank' onClick={() =>
              {
              if (confirm('정말 삭제하시겠습니까?') == true) {
                apiDeleteComment({ comment_id: comment.comment_id }).then(
                  (a) => {
                    if (a.status === 'SUCCESS') {
                      setDel(true);
                      alert("성공적으로 삭제했습니다.")
                        
                    }
                    else{
                      alert("삭제하지 못했습니다. 잠시 후 다시 시도해주세요.")
                    }
                  }
                )
              }
              }}>삭제</Button>
          </>
          : <></>
      }
      <Button kind='blank'>강의평 좋아요 ({comment.likes})</Button>
      <Button kind='blank'>신고 </Button>
    </VStack>
  </HStack>;
}

export default function CommentView({ comment }: { comment: Comment }) {

  const sessionId = useSessionId();
 
  const editable = comment.profile_id === sessionId.sessionId?.profile_id;

  const [ del, setDel ] = useState<boolean>(false);

  return <div className={`${del? 'hidden' : ''} flex flex-col md:flex-row bg-white mt-3 p-8 rounded-3xl gap-5 border border-neutral-300`}>
    <Left comment={comment} />
    <Right comment={comment} editable={editable} setDel={setDel} />
  </div>;
}

