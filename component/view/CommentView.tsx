'use client';

import { Star1 } from '@/components/composite/starIndicator';
import { HStack, VStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import { useEffect, useState } from 'react';

import { apiDeleteComment, apiLikeComment } from '@/lib/api/calls/course';

import { decode } from '@/lib/jwt';

import Link from 'next/link';
import { useSessionId } from '@/lib/context/SessionIdContext';
import { EditIcon, SelectedThumbUpIcon, ThumbUpIcon } from '@/lib/icons';

function quaternary<T>(that: number, standard: number, gt: T, eq: T, lt: T) {
  if (that === standard) {
    return eq;
  } else if (that > standard) {
    return gt;
  }
  return lt;
}

function getTag(comment: AcdComment | AcdMyComment) {
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
  ]
    .flat(1)
    .slice(0, 3);
}

function Left({ comment }: { comment: AcdComment | AcdMyComment }) {
  const green = '!bg-green-500/10 !text-green-500';
  const yellow = '!bg-yellow-400/20 !text-yellow-500';
  const red = '!bg-red-600/10 !text-red-600';

  return (
    <div
      className="flex flex-row md:flex-col items-center justify-evenly md:justify-start mt-5 md:pt-5 md:border-r md:border-r-neutral-200 w-full md:w-fit h-full gap-5"
      style={{
        minWidth: '260px',
        flexWrap: 'wrap',
      }}
    >
      <span className="text-5xl font-semibold flex flex-row items-center gap-2">
        <Star1 rate={comment.rating / 5} px={36} />
        {comment.rating.toFixed(1)}
      </span>

      <div className="hidden md:block border-t my-4 border-t-neutral-200 w-full" />

      <div className="grid gird-cols-1 sm:grid-cols-2 auto-cols-auto gap-x-9 gap-y-6 text-sm">
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
    </div>
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
  const [newLike, setNewLike] = useState<boolean>(false);

  useEffect(() => setNewLike(false), []);

  const textColorClass = comment.already_like
    ? newLike
      ? 'text-neutral-400 border-neutral-400'
      : 'text-red-600 border-red-600/50'
    : newLike
      ? 'text-red-600 border-red-600/50'
      : 'text-neutral-400 border-neutral-400';

  return (
    <HStack className="w-full h-full" gap="8px">
      <VStack
        style={{
          overflow: 'hidden',
          height: 'min-content',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '20px',
        }}
        className="text-base justify-between"
      >
        <div className="flex gap-2 items-center">
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
      <div className="flex flex-row text-xl font-normal gap-4 mt-8 mb-4">
        <div className="text-neutral-400 text-base w-max">작성내용</div>
        <div className="break-all break-words whitespace-pre-line text-wrap">{comment.review}</div>
      </div>
      <VStack className="self-end items-center" gap="12px">
        <button
          className={`flex flex-row justify-center items-center px-4 py-1 border rounded-full gap-2 ${textColorClass}`}
          onClick={() => {
            apiLikeComment({ comment_id: comment.comment_id }).then((s) => {
              if (s.status === 'SUCCESS') {
                setNewLike(!newLike);
              } else {
                alert('강의평 좋아요에 실패하였습니다. 잠시 후 다시 시도해주세요.');
              }
            });
          }}
        >
          {comment.already_like ? (
            newLike ? (
              <ThumbUpIcon />
            ) : (
              <SelectedThumbUpIcon />
            )
          ) : newLike ? (
            <SelectedThumbUpIcon />
          ) : (
            <ThumbUpIcon />
          )}
          추천하기 (
          {comment.already_like
            ? newLike
              ? comment.likes - 1
              : comment.likes
            : newLike
              ? comment.likes + 1
              : comment.likes}
          )
        </button>
        <Link href={`/comment/${comment.comment_id}/report`}>
          <button className="flex justify-center items-center px-4 py-1 border rounded-full border-neutral-400 text-neutral-400">
            신고{' '}
          </button>
        </Link>
      </VStack>
      {editable ? (
        <VStack className="self-end items-center" gap="12px">
          <Link href={`/comment/${comment.comment_id}/edit`}>
            <button className="flex justify-center items-center gap-2 px-4 py-1 border rounded-full border-neutral-400 text-neutral-400">
              <EditIcon />
              수정
            </button>
          </Link>
          <button
            className="flex justify-center items-center px-4 py-1 border rounded-full border-neutral-400 text-neutral-400"
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
          </button>
        </VStack>
      ) : (
        <></>
      )}
    </HStack>
  );
}

function MyRight({ comment, setDel }: { comment: AcdMyComment; setDel: React.Dispatch<boolean> }) {
  return (
    <HStack className="w-full h-full" gap="8px">
      <Link href={`/lecture/${comment.course_id}`}>
        <VStack
          style={{
            overflow: 'hidden',
            height: 'min-content',
            flexWrap: 'wrap',
            gap: '8px',
            paddingTop: '20px',
          }}
          className="text-base justify-between"
        >
          <div className="flex gap-2 items-baseline flex-wrap">
            <span className="text-2xl font-semibold mr-2">{comment.name}</span>
            <div className="flex gap-2 items-baseline">
              <span className="font-normal">{comment.professor}</span>
              <span className="text-sm text-neutral-400">교수님</span>
            </div>
          </div>

          <div className="flex flex-row w-max gap-4">
            {getTag(comment).flatMap((v, i) => (
              <Tag key={i}>{v}</Tag>
            ))}
          </div>
        </VStack>
        <VStack className="gap-3 items-center mt-2">
          <span className="text-neutral-400">작성일</span>
          <span className="mr-3">{comment.updated_at}</span>
          <ThumbUpIcon />
          <span> {comment.likes}</span>
        </VStack>
        <span className="flex flex-row text-xl font-normal flex-grow gap-4 mt-4 mb-2">
          <div className="break-all break-words whitespace-pre-line text-wrap">{comment.review}</div>
        </span>
      </Link>
      <VStack className="self-end items-center gap-4">
        <Link href={`/comment/${comment.comment_id}/edit`}>
          <button className="flex justify-center items-center gap-2 px-4 py-1 border rounded-full border-neutral-400 text-neutral-400">
            <EditIcon />
            수정
          </button>
        </Link>
        <button
          className="flex justify-center items-center px-4 py-1 border rounded-full border-neutral-400 text-neutral-400"
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
        </button>
      </VStack>
    </HStack>
  );
}

export default function CommentView({ comment }: { comment: AcdComment }) {
  const [jwt] = useSessionId();

  const editable = jwt === null ? true : comment.profile_id === decode<JWTDecoded>(jwt.accessToken).profile_id;

  const [del, setDel] = useState<boolean>(false);

  return (
    <div
      className={`${del ? 'hidden' : ''} flex flex-col md:flex-row items-center mt-3 p-4 rounded-3xl gap-5 border
  
  light:bg-base-32 dark:bg-base-2
  light:border-base-28 dark:border-base-4`}
    >
      <Left comment={comment} />
      <Right comment={comment} editable={editable} setDel={setDel} />
    </div>
  );
}

export function MyCommentView({ comment }: { comment: AcdMyComment }) {
  const [del, setDel] = useState<boolean>(false);

  return (
    <div
      className={`${del ? 'hidden' : ''} flex flex-col md:flex-row items-center mt-3 p-4 rounded-3xl gap-5 border
  
  light:bg-base-32 dark:bg-base-2
  light:border-base-28 dark:border-base-4`}
    >
      <Left comment={comment} />
      <MyRight comment={comment} setDel={setDel} />
    </div>
  );
}
