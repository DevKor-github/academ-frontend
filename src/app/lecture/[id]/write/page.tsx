'use client';

import { createCommentPrepare } from '@/app/api/comment.api';
import WriteComment from './fetch';
import ErrorTemplate, { ErrorLogintemplate } from '@/components/template';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Props {
  params: Promise<{ id: string }>;
}

export default function WritePage({ params }: Props) {
  const { id } = use(params);
  // const writable = use();

  const { data: writable } = useQuery({
    queryKey: ['writableComment'],
    queryFn: () => createCommentPrepare({ course_id: Number(id) }),
  });

  if (!writable) return null;

  return writable.status === 'SUCCESS' ? (
    //&& writable.statusCode === 200
    <WriteComment course={writable.data} />
  ) : writable.code === 'UNAUTHORIZED' ? (
    <ErrorLogintemplate
      title={JSON.stringify(writable)}
      subtitle={`강의평을 작성할 수 없습니다.
        로그인 후 사용해주십시오.`}
    />
  ) : (
    <ErrorTemplate
      // TODO
      title={JSON.stringify(writable)}
      subtitle={`강의평을 작성할 수 없습니다.
        ${writable.message}`}
    />
  );
}
