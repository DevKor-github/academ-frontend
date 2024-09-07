import { build } from '@/lib/api/builder';

export const apiSearch = build<SearchRequest, Course[]>('GET', '/api/course/search');
export const apiBookmark = build<CourseId, string>('GET', '/api/course/bookmark');
export const apiCourseDetail = build<CourseDetailRequest, Course>('GET', '/api/course/detail');

/**
 * Comments
 */

export const apiStartNewComment = build<CourseId, Course>('GET', '/api/course/start-insert-comment');
export const apiInsertComment = build<AcdCommentNewReq, string>('POST', '/api/course/insert-comment');
export const apiStartUpdateComment = build<AcdCommentRelated, Course & AcdCommentEditReq>(
  'GET',
  '/api/course/start-update-comment',
);
export const apiUpdateComment = build<AcdCommentEditReq, string>('POST', '/api/course/update-comment');
export const apiDeleteComment = build<AcdCommentRelated, Omit<Course, 'isBookmark'>>(
  'POST',
  '/api/course/delete-comment',
);
export const apiMyComments = build<Record<string, never>, AcdComment[]>('GET', '/api/course/my-comments');
export const apiLikeComment = build<AcdCommentRelated, AcdComment[]>('POST', '/api/course/like-comment');

export const apiRepComment = build<AcdCommentReportReq, AcdComment[]>('POST', '/api/course/report-comment');
