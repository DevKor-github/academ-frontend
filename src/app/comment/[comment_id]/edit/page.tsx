import EditComment from './form';
import ErrorTemplate from '@/components/template';
import { updateCommentPrepare } from '@/app/api/comment.api';

interface Props {
  params: Promise<{ comment_id: number }>;
}

export default async function EditPage({ params }: Props) {
  const { comment_id } = await params;

  const editable = await updateCommentPrepare(comment_id);

  return editable.status === 'SUCCESS' ? (
    <EditComment courseName={editable.data.name} comment={editable.data} />
  ) : (
    <ErrorTemplate
      title={editable.statusCode.toString()}
      subtitle={`강의평을 작성할 수 없습니다.
        ${JSON.stringify(editable)}`}
    />
  );
}
