import { build, createApiHook, createApiHook2 } from '@/lib/api/builder';

export const apiSearch = build<SearchRequest, CourseWithBookmark[]>('GET', '/api/course/search');
export const apiBookmark = build<CourseId, string>('GET', '/api/course/bookmark');

export const apiCourseDetail = build<CourseDetailRequest, CourseWithBookmark>('GET', '/api/course/detail');

export const useApiSearch = createApiHook2(apiSearch);
export const useApiCourseDetail = createApiHook(apiCourseDetail);

/**
 * Comments
 */

export const apiStartNewComment = build<CourseId, CourseWithBookmark>('GET', '/api/course/start-insert-comment');
export const apiInsertComment = build<AcdCommentNewReq, string>('POST', '/api/course/insert-comment');
export const apiStartUpdateComment = build<AcdCommentRelated, Course & AcdCommentEditReq>(
  'GET',
  '/api/course/start-update-comment',
);
export const apiUpdateComment = build<AcdCommentEditReq, string>('POST', '/api/course/update-comment');
export const apiDeleteComment = build<AcdCommentRelated, Course>('POST', '/api/course/delete-comment');
export const apiMyComments = build<{}, AcdComment[]>('GET', '/api/course/my-comments');
export const apiLikeComment = build<AcdCommentRelated, AcdComment[]>('POST', '/api/course/like-comment');

export const apiRepComment = build<AcdCommentReportReq, AcdComment[]>('POST', '/api/course/report-comment');

export const useApiStartNewComment = createApiHook(apiStartNewComment);
export const useApiStartUpdateComment = createApiHook(apiStartUpdateComment);
export const useApiUpdateComment = createApiHook(apiUpdateComment);
export const useApiMyComments = createApiHook(apiMyComments);
