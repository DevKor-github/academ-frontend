import { build, createApiHook, createApiHook2 } from '@/lib/api/builder';
import { Course, CourseWithBookmark } from '../models/course';
import { Comment } from '../models/comment';

export interface SearchRequest {
  keyword: string;
  order: 'NEWEST' | 'RATING_DESC' | 'RATING_ASC';
  page: number;
}

export interface CourseId {
  course_id: number;
}

export interface CourseDetailRequest extends CourseId {
  order: 'NEWEST' | 'RATING_DESC' | 'RATING_ASC' | 'LIKES_DESC' | 'LIKES_ASC';
  page: number;
}

export type CommentNewReq = Omit<
  Comment,
  'username' | 'profile_id' | 'created_at' | 'updated_at' | 'likes' | 'comment_id'
> & { course_id: number };
export type CommentEditReq = Omit<Comment, 'username' | 'profile_id' | 'created_at' | 'updated_at' | 'likes'>;

export type CommentMeet = Comment & CommentNewReq & CommentEditReq;
export type CommentJoin = Comment | CommentNewReq | CommentEditReq;

export const apiSearch = build<SearchRequest, CourseWithBookmark[]>('GET', '/api/course/search');
export const apiBookmark = build<CourseId, string>('GET', '/api/course/bookmark');

export const apiCourseDetail = build<CourseDetailRequest, CourseWithBookmark>('GET', '/api/course/detail');

export const useApiSearch = createApiHook2(apiSearch);
export const useApiCourseDetail = createApiHook(apiCourseDetail);

/**
 * Comments
 */

export interface CommentRelated {
  comment_id: number;
}
export const apiStartNewComment = build<CourseId, CourseWithBookmark>('GET', '/api/course/start-insert-comment');
export const apiInsertComment = build<CommentNewReq, string>('POST', '/api/course/insert-comment');
export const apiStartUpdateComment = build<CommentRelated, Course & CommentEditReq>(
  'GET',
  '/api/course/start-update-comment',
);
export const apiUpdateComment = build<CommentEditReq, string>('POST', '/api/course/update-comment');
export const apiDeleteComment = build<CommentRelated, Course>('POST', '/api/course/delete-comment');
export const apiMyComments = build<{}, Comment[]>('GET', '/api/course/my-comments');
export const apiLikeComment = build<CommentRelated, Comment[]>('POST', '/api/course/like-comment');

export interface CommentReportReq extends CommentRelated {
  reason: 'PROFANITY' | 'INSINCERE' | 'SEXUAL' | 'PERSONAL' | 'OTHER';
  detail: string;
}

export const apiRepComment = build<CommentReportReq, Comment[]>('POST', '/api/course/report-comment');

export const useApiStartNewComment = createApiHook(apiStartNewComment);
export const useApiStartUpdateComment = createApiHook(apiStartUpdateComment);
export const useApiUpdateComment = createApiHook(apiUpdateComment);
export const useApiMyComments = createApiHook(apiMyComments);
