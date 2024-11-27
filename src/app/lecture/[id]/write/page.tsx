import { startNewComment } from '@/app/api/comment.api';
import WriteComment from './fetch';
import ErrorTemplate from '@/lib/template';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WritePage({ params }: Props) {
  const { id } = await params;
  const writable = await startNewComment({ course_id: Number(id) });

  return writable.status === 'SUCCESS' && writable.status === 'SUCCESS' && writable.statusCode === 200 ? (
    <WriteComment course={writable.data} />
  ) : (
    <ErrorTemplate
      title={writable.statusCode.toString()}
      subtitle={`강의평을 작성할 수 없습니다.
        ${writable.message}`}
    />
  );
}
