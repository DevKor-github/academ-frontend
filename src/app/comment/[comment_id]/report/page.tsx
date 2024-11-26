import ReportCommentLoading from './loading';

import dynamic from 'next/dynamic';

const ReportComment = dynamic(() => import('./client'), { ssr: false, loading: ReportCommentLoading });

export default async function EditPage(props: { params: Promise<{ comment_id: number }> }) {
  const params = await props.params;

  const {
    comment_id
  } = params;

  return <ReportComment comment_id={comment_id} />;
}
