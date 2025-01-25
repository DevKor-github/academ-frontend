'use client';

import { startNewComment } from '@/app/api/comment.api';
import WriteComment from './fetch';
import ErrorTemplate from '@/components/template';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Props {
  params: Promise<{ id: string }>;
}

export default function WritePage({ params }: Props) {
  const { id } = use(params);
  // const writable = use();

  const { data: writable } = useQuery({
    queryKey: ['asdfasdfasdf'],
    queryFn: () => startNewComment({ course_id: Number(id) }),
  });

  if (!writable) return null;

  return writable.status === 'SUCCESS' ? (
    //&& writable.statusCode === 200
    <WriteComment course={writable.data} />
  ) : (
    <ErrorTemplate
      // TODO
      title={JSON.stringify(writable)}
      subtitle={`강의평을 작성할 수 없습니다.
        ${writable.message}`}
    />
  );
}
