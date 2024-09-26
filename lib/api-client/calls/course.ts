import { build } from '@/lib/api-client/builder';

import refreshFirst from '../instances/refreshFirst';
import doRefresh from '../instances/\bwithRefresh';

// use alwaysRefreshFirst to some apis success for non-auth users

export const apiSearch = build<ReqSearchCourse, Course[] | CourseOnly[]>(refreshFirst, 'GET', '/api/course/search');
export const apiSearchCount = build<ReqSearch, number>(doRefresh, 'GET', '/api/course/search/count-result');
export const apiBookmark = build<ReqCourseRelated, string>(doRefresh, 'GET', '/api/course/bookmark');
export const apiCourseDetail = build<ReqCourseDetail, CourseOnly | Course>(refreshFirst, 'GET', '/api/course/detail');

/**
 * Comments
 */

export const apiStartNewComment = build<ReqCourseRelated, Course>(doRefresh, 'GET', '/api/course/start-insert-comment');
export const apiInsertComment = build<AcdCommentNewReq, number>(doRefresh, 'POST', '/api/course/insert-comment');
export const apiStartUpdateComment = build<AcdCommentRelated, Course & AcdCommentEditReq>(
  doRefresh,
  'GET',
  '/api/course/start-update-comment',
);
export const apiUpdateComment = build<AcdCommentEditReq, number>(doRefresh, 'POST', '/api/course/update-comment');
export const apiDeleteComment = build<AcdCommentRelated, Omit<Course, 'isBookmark'>>(
  doRefresh,
  'POST',
  '/api/course/delete-comment',
);
export const apiMyComments = build<Record<string, never>, AcdComment[]>(doRefresh, 'GET', '/api/course/my-comments');
export const apiLikeComment = build<AcdCommentRelated, AcdComment[]>(doRefresh, 'POST', '/api/course/like-comment');

export const apiRepComment = build<AcdCommentReportReq, AcdComment[]>(doRefresh, 'POST', '/api/course/report-comment');
