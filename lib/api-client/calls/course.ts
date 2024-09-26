import { build } from '@/lib/api-client/builder';
import withTokenInstance from '../instances/withTokenOnce';
import withRefreshResolved from '../instances/withRefreshResolved';

export const apiSearch = build<ReqSearchCourse, Course[] | CourseOnly[]>(
  withRefreshResolved,
  'GET',
  '/api/course/search',
);
export const apiSearchCount = build<ReqSearch, number>(withTokenInstance, 'GET', '/api/course/search/count-result');
export const apiBookmark = build<ReqCourseRelated, string>(withTokenInstance, 'GET', '/api/course/bookmark');
export const apiCourseDetail = build<ReqCourseDetail, CourseOnly | Course>(
  withRefreshResolved,
  'GET',
  '/api/course/detail',
);

/**
 * Comments
 */

export const apiStartNewComment = build<ReqCourseRelated, Course>(
  withTokenInstance,
  'GET',
  '/api/course/start-insert-comment',
);
export const apiInsertComment = build<AcdCommentNewReq, number>(
  withTokenInstance,
  'POST',
  '/api/course/insert-comment',
);
export const apiStartUpdateComment = build<AcdCommentRelated, Course & AcdCommentEditReq>(
  withTokenInstance,
  'GET',
  '/api/course/start-update-comment',
);
export const apiUpdateComment = build<AcdCommentEditReq, number>(
  withTokenInstance,
  'POST',
  '/api/course/update-comment',
);
export const apiDeleteComment = build<AcdCommentRelated, Omit<Course, 'isBookmark'>>(
  withTokenInstance,
  'POST',
  '/api/course/delete-comment',
);
export const apiMyComments = build<Record<string, never>, AcdComment[]>(
  withTokenInstance,
  'GET',
  '/api/course/my-comments',
);
export const apiLikeComment = build<AcdCommentRelated, AcdComment[]>(
  withTokenInstance,
  'POST',
  '/api/course/like-comment',
);

export const apiRepComment = build<AcdCommentReportReq, AcdComment[]>(
  withTokenInstance,
  'POST',
  '/api/course/report-comment',
);
