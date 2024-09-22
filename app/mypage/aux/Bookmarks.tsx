import { use, memo } from 'react';
import { apiMyPageBookmarks } from '@/lib/api-client/calls/mypage';
import CoursePreview from '@/component/view/CoursePreview';

export default memo(function Bookmarks({ page }: { page: number }) {
  const lectures = use(apiMyPageBookmarks({ page }));

  if (lectures.status !== 'SUCCESS') {
    return <div>오류가 발생했습니다.</div>;
  }

  return lectures.data.flatMap((c) => <CoursePreview course={c} />);
});
