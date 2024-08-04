import ReportCommentLoading from './loading';

import dynamic from 'next/dynamic';

const ReportComment = dynamic(() => import('./client'), { ssr: false, loading: ReportCommentLoading });

export default function EditPage({ params: { comment_id } }: { params: { comment_id: number } }) {
  return <ReportComment comment_id={comment_id} />;
}
