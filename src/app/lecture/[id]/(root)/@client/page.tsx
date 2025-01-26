import SummaryPage from "./summary.page"
import CommentsViewById from "./comments.page/comments.page"

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id: course_id } = await params;
  return (
    <>
      <SummaryPage course_id={course_id} />
      <CommentsViewById course_id={course_id} />
    </>
  )
}