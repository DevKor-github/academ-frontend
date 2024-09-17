import { build } from '@/lib/api/builder';
import withTokenInstance from './instances.ts/withTokenInstance';

export const apiSearch = build<SearchRequest, Course[]>(withTokenInstance, 'GET', '/api/course/search');
export const apiBookmark = build<CourseId, string>(withTokenInstance, 'GET', '/api/course/bookmark');
export const apiCourseDetail = build<CourseDetailRequest, Course>(withTokenInstance, 'GET', '/api/course/detail');

/**
 * Comments
 */

export const apiStartNewComment = build<CourseId, Course>(withTokenInstance, 'GET', '/api/course/start-insert-comment');
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
