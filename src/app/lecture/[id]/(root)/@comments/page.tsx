import { courseDetail } from '@/app/api/lecture.api';
import { ELEM_PER_PAGE } from '@/data/constant';
import CommentsView from './components/fetch';
import { getAccessTokenDecoded } from '@/auth/auth.util';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CommentsViewById({ params }: Props) {
  const { id: course_id } = await params;

  // XXX : this is just for showing basic information, order is **NOT** important - maybe api refactor?
  const course = await courseDetail(Number(course_id));

  // TODO refresh logic
  const sessionUserID = (await getAccessTokenDecoded())?.profile_id;

  const totalPage = Math.ceil(course.data.count_comments / ELEM_PER_PAGE);

  return <CommentsView course={course.data} totalPage={totalPage} sessionUserID={sessionUserID} />;
}
