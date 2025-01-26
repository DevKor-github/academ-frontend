import ReportComment from './client';

export default async function EditPage(props: { params: Promise<{ comment_id: number }> }) {
  const params = await props.params;
  const { comment_id } = params;
  return <ReportComment comment_id={comment_id} />;
}
