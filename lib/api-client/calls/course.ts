import { build } from '@/lib/api-client/builder';

export const apiSearch = build<ReqSearchCourse, Course[] | CourseOnly[]>('GET', '/api/course/search');
export const apiSearchCount = build<ReqSearch, number>('GET', '/api/course/search/count-result');
export const apiBookmark = build<ReqCourseRelated, string>('GET', '/api/course/bookmark');
export const apiCourseDetail = build<ReqCourseDetail, CourseOnly | Course>('GET', '/api/course/detail');

/**
 * Comments
 */

export const apiStartNewComment = build<ReqCourseRelated, Course>('GET', '/api/course/start-insert-comment');
export const apiInsertComment = build<AcdCommentNewReq, number>('POST', '/api/course/insert-comment');
export const apiStartUpdateComment = build<AcdCommentRelated, Course & AcdCommentEditReq>(
  'GET',
  '/api/course/start-update-comment',
);
export const apiUpdateComment = build<AcdCommentEditReq, number>('POST', '/api/course/update-comment');
export const apiDeleteComment = build<AcdCommentRelated, Omit<Course, 'isBookmark'>>(
  'POST',
  '/api/course/delete-comment',
);
export const apiMyComments = build<Record<string, never>, AcdComment[]>('GET', '/api/course/my-comments');
export const apiLikeComment = build<AcdCommentRelated, AcdComment[]>('POST', '/api/course/like-comment');

export const apiRepComment = build<AcdCommentReportReq, AcdComment[]>('POST', '/api/course/report-comment');
