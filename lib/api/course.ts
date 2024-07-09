import { build, createApiHook } from '@/lib/api/builder';
import { Course } from '../models/course';
import { Comment } from '../models/comment';

export interface SearchRequest {
  keyword: string;
  order: 'NEWEST' | 'RATING_DESC' | 'RATING_ASC';
  page: number;
}

export interface CourseRelatedRequest {
  course_id: number;
}

export type CommentNewReq = Omit<
  Comment,
  'username' | 'profile_id' | 'created_at' | 'updated_at' | 'likes' | 'comment_id'
> & { course_id: number };
export type CommentEditReq = Omit<Comment, 'username' | 'profile_id' | 'created_at' | 'updated_at' | 'likes'>;

export type CommentMeet = Comment & CommentNewReq & CommentEditReq;
export type CommentJoin = Comment | CommentNewReq | CommentEditReq;

export const apiSearch = build<SearchRequest, Course[]>('GET', '/api/course/search');
export const apiBookmark = build<CourseRelatedRequest, Course[]>('GET', '/api/course/bookmark');
export const apiCourseDetail = build<CourseRelatedRequest, Course>('GET', '/api/course/detail');

export const useApiSearch = createApiHook(apiSearch);
export const useApiCourseDetail = createApiHook(apiCourseDetail);

/**
 * Comments
 */

export interface CommentRelated {
  comment_id: number;
}

export const apiStartNewComment = build<CourseRelatedRequest, Course>('GET', '/api/course/start-insert-comment');
export const apiInsertComment = build<CommentNewReq, string>('POST', '/api/course/insert-comment');
export const apiStartUpdateComment = build<CommentRelated, CommentEditReq>('GET', '/api/course/start-update-comment');
export const apiUpdateComment = build<CommentEditReq, string>('POST', '/api/course/update-comment');
export const apiDeleteComment = build<CommentRelated, Course>('POST', '/api/course/delete-comment');
export const apiMyComments = build<{}, Comment[]>('GET', '/api/course/my-comments');
export const apiLikeComment = build<CommentRelated, Comment[]>('POST', '/api/course/like-comment');
export const apiRepComment = build<CommentRelated, Comment[]>('POST', '/api/course/report-comment');

export const useApiStartNewComment = createApiHook(apiStartNewComment);
export const useApiStartUpdateComment = createApiHook(apiStartUpdateComment);
export const useApiUpdateComment = createApiHook(apiUpdateComment);
export const useApiMyComments = createApiHook(apiMyComments);
