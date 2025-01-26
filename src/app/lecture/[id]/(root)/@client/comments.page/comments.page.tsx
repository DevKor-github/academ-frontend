'use client';

import { courseDetail } from '@/app/api/lecture.api';
import { ELEM_PER_PAGE } from '@/data/constant';
import CommentsView from './components/fetch';
import { getAccessTokenDecoded } from '@/util/auth.util';
import { useQuery } from '@tanstack/react-query';

interface Props {
  course_id: string;
}

export default function CommentsViewById({ course_id }: Props) {
  // XXX : this is just for showing basic information, order is **NOT** important - maybe api refactor?
  // TODO use centralized service for query key management
  const { data: course } = useQuery({
    queryKey: ['course_detail_without_comments', course_id],
    queryFn: () => courseDetail(Number(course_id)),
  })

  // TODO refresh logic
  const { data: sessionUserID } = useQuery({
    queryKey: ['sessionUserID'],
    queryFn: async () => (await getAccessTokenDecoded())?.profile_id ?? null,
  });

  if (course === undefined) {
    return null;
  }

  const totalPage = Math.ceil(course.data.count_comments / ELEM_PER_PAGE);

  return <CommentsView course={course.data} totalPage={totalPage} sessionUserID={sessionUserID} />;
}
