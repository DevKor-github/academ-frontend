import { build } from '@/lib/api-client/builder';

export const apiSearch = build<ReqSearchCourse, Course[] | CourseOnly[]>('get', 'api/course/search');

/** @deprecated use server side instead */
export const apiSearchCount = build<ReqSearch, number>('get', 'api/course/search/count-result');
export const apiBookmark = build<ReqCourseRelated, string>('get', 'api/course/bookmark');
export const apiCourseDetail = build<ReqCourseDetail, CourseOnly | Course>('get', 'api/course/detail');

/**
 * Comments
 */

export const apiStartNewComment = build<ReqCourseRelated, Course>('get', 'api/course/start-insert-comment');
export const apiInsertComment = build<AcdCommentNewReq, number>('post', 'api/course/insert-comment');
export const apiStartUpdateComment = build<AcdCommentRelated, Course & AcdCommentEditReq>(
  'get',
  '/api/course/start-update-comment',
);
export const apiUpdateComment = build<AcdCommentEditReq, number>('post', 'api/course/update-comment');
export const apiDeleteComment = build<AcdCommentRelated, Omit<Course, 'isBookmark'>>(
  'post',
  '/api/course/delete-comment',
);
export const apiMyComments = build<Record<string, never>, AcdComment[]>('get', 'api/course/my-comments');
export const apiLikeComment = build<AcdCommentRelated, AcdComment[]>('post', 'api/course/like-comment');

export const apiRepComment = build<AcdCommentReportReq, AcdComment[]>('post', 'api/course/report-comment');
