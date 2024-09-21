import { use, memo } from 'react';
import { apiMyPageBookmarks } from '@/lib/api/calls/mypage';
import CoursePreview from '@/components/view/CoursePreview';

export default memo(function Bookmarks({ page }: { page: number }) {
  const lectures = use(apiMyPageBookmarks({ page }));

  if (lectures.status !== 'SUCCESS') {
    return <div>오류가 발생했습니다.</div>;
  }

  return lectures.data.flatMap((c) => <CoursePreview course={c} />);
});
