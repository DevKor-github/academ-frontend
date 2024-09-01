'use client';

import { Star1 } from '@/components/composite/starIndicator';
import { HStack, VStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import Button from '@/components/basic/button';
import { useState } from 'react';

import { apiDeleteComment, apiLikeComment } from '@/lib/api/course';

import { decode } from '@/lib/jwt';

import Link from 'next/link';
import { useSessionId } from '@/context/SessionIdContext';
import { ThumbUpIcon } from '@/icons';

function quaternary<T>(that: number, standard: number, gt: T, eq: T, lt: T) {
  if (that === standard) {
    return eq;
  } else if (that > standard) {
    return gt;
  }
  return lt;
}

function getTag(comment: AcdComment) {
  return [
    comment.teach_t1_theory ? ['이론 수업'] : [],
    comment.teach_t2_practice ? ['실습 수업'] : [],
    comment.teach_t3_seminar ? ['세미나형 수업'] : [],
    comment.teach_t4_discussion ? ['토론형 수업'] : [],
    comment.teach_t5_presentation ? ['발표'] : [],
    comment.learn_t1_theory ? ['지식 습득에 도움'] : [],
    comment.learn_t2_thesis ? ['논문 작성에 도움'] : [],
    comment.learn_t3_exam ? ['시험 대비에 도움'] : [],
    comment.learn_t4_industry ? ['현업 적용에 도움'] : [],
  ].flat(1);
}

function Left({ comment }: { comment: AcdComment }) {
  const green = '!bg-green-500/10 !text-green-500';
  const yellow = '!bg-yellow-400/20 !text-yellow-500';
  const red = '!bg-red-600/10 !text-red-600';

  return (
    <HStack
      className="items-center justify-evenly md:border-r md:border-r-neutral-200 w-fit h-full"
      gap="20px"
      style={{
        minWidth: '260px',
        flexWrap: 'wrap',
      }}
    >
      <span className="text-5xl font-semibold flex flex-row items-center gap-2">
        <Star1 rate={comment.rating / 5} px={36} />
        {comment.rating.toFixed(1)}
      </span>

      <div className="border-t border-t-neutral-200 w-full" />

      <div className="grid grid-cols-2 auto-cols-auto gap-x-9 gap-y-6 text-sm">
        <VStack gap="4px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-base">학습량</span>
          <Tag className={`${quaternary(comment.r1_amount_of_studying, 3, red, yellow, green)} h-fit py-1 x-fit px-3`}>
            {quaternary(comment.r1_amount_of_studying, 3, '많음', '보통', '적음')}
          </Tag>
        </VStack>
        <VStack gap="4px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-base">난이도</span>
          <Tag className={`${quaternary(comment.r2_difficulty, 3, red, yellow, green)} h-fit py-1 x-fit px-3`}>
            {quaternary(comment.r2_difficulty, 3, '높음', '보통', '낮음')}
          </Tag>
        </VStack>
        <VStack gap="4px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-base">전달력</span>
          <Tag className={`${quaternary(comment.r3_delivery_power, 3, green, yellow, red)} h-fit py-1 x-fit px-3`}>
            {quaternary(comment.r3_delivery_power, 3, '좋음', '보통', '나쁨')}
          </Tag>
        </VStack>
        <VStack gap="16px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-base">학점</span>
          <Tag className={`${quaternary(comment.r4_grading, 3, green, yellow, red)} h-fit py-1 x-fit px-3`}>
            {quaternary(comment.r4_grading, 3, '높음', '보통', '낮음')}
          </Tag>
        </VStack>
      </div>
    </HStack>
  );
}

function Right({
  editable,
  comment,
  setDel,
}: {
  editable: boolean;
  comment: AcdComment;
  setDel: React.Dispatch<boolean>;
}) {
  const textColorClass = comment.already_like
    ? 'text-red-600 border-red-600/50'
    : 'text-neutral-400 border-neutral-400';

  return (
    <HStack className="w-full h-full" gap="8px">
      <VStack
        style={{
          overflow: 'hidden',
          height: 'min-content',
          flexWrap: 'wrap',
          gap: '4px',
          paddingTop: '20px',
        }}
        className="text-base justify-between"
      >
        <div className="flex gap-2">
          <span className="text-neutral-400">닉네임</span>
          <span className="font-semibold mr-2">{comment.username}</span>
          <span className="text-neutral-400">작성일</span>
          <span className="font-normal">{comment.updated_at}</span>
        </div>

        <div className="flex flex-row w-max gap-4">
          {getTag(comment).flatMap((v, i) => (
            <Tag key={i}>{v}</Tag>
          ))}
        </div>
      </VStack>
      <span className="flex flex-row text-xl font-normal flex-grow gap-4 mt-8 mb-2">
        <div className="text-neutral-400 text-base w-max">작성내용</div>
        <div className="break-words whitespace-pre-line">{comment.review}</div>
      </span>
      <VStack className="self-end" gap="4px">
        {editable ? (
          <>
            <Link href={`/comment/${comment.comment_id}/edit`}>
              <Button kind="blank">수정</Button>
            </Link>
            <Button
              kind="blank"
              onClick={() => {
                if (confirm('정말 삭제하시겠습니까?') == true) {
                  apiDeleteComment({ comment_id: comment.comment_id }).then((a) => {
                    if (a.status === 'SUCCESS') {
                      setDel(true);
                      alert('성공적으로 삭제했습니다.');
                    } else {
                      alert('삭제하지 못했습니다. 잠시 후 다시 시도해주세요.');
                    }
                  });
                }
              }}
            >
              삭제
            </Button>
          </>
        ) : (
          <></>
        )}
        <button
          className={`flex flex-row justify-center items-center px-4 py-1 border rounded-full gap-2 ${textColorClass}`}
          onClick={() => {
            apiLikeComment({ comment_id: comment.comment_id }).then((a) => {
              if (a.status === 'SUCCESS') {
              } else {
                alert('강의평 좋아요에 실패하였습니다. 잠시 후 다시 시도해주세요.');
              }
            });
          }}
        >
          <ThumbUpIcon /> 이 글 추천하기 ({comment.likes})
        </button>
        <Link href={`/comment/${comment.comment_id}/report`}>
          <button className="flex justify-center items-center px-4 py-1 border rounded-full border-neutral-400 text-neutral-400">
            신고{' '}
          </button>
        </Link>
      </VStack>
    </HStack>
  );
}

export default function CommentView({ comment }: { comment: AcdComment }) {
  const [jwt] = useSessionId();

  const editable = jwt === null ? true : comment.profile_id === decode<JWTDecoded>(jwt.accessToken).memberId;

  const [del, setDel] = useState<boolean>(false);

  return (
    <div
      className={`${del ? 'hidden' : ''} flex flex-col md:flex-row items-center mt-3 p-4 rounded-3xl gap-5 border
  
  light:bg-white dark:bg-dark-back-2
  light:border-light-back-4 dark:border-dark-back-4`}
    >
      <Left comment={comment} />
      <Right comment={comment} editable={editable} setDel={setDel} />
    </div>
  );
}
