
import { build, createApiHook } from '@/lib/api/builder/backend';
import { Course } from '../models/course';
import { Comment } from '../models/comment';

export interface SearchRequest {
  keyword: string;
}

export interface CourseRelatedRequest {
  course_id: number;
}

export type CommentNewReq = Omit<Comment, "username" | "profile_id" | "created_at" | "updated_at" | "likes" | "comment_id"> & { "course_id" : number };
export type CommentEditReq = Omit<Comment, "username" | "profile_id" | "created_at" | "updated_at" | "likes">;

export type CommentMeet = Comment & CommentNewReq & CommentEditReq;
export type CommentJoin = Comment | CommentNewReq | CommentEditReq;

export const apiSearch = build<SearchRequest, Course[]>("GET", "/api/course/search", [400, 401, 404])
export const useApiSearch = createApiHook(apiSearch);

export const apiBookmark = build<CourseRelatedRequest, Course[]>("GET", "/api/course/bookmark", [400, 401, 404])

export const apiCourseDetail = build<CourseRelatedRequest, Course>("GET", "/api/course/detail", [400, 401, 404])
export const useApiCourseDetail = createApiHook(apiCourseDetail);

export const apiStartNewComment = build<CourseRelatedRequest, Course>("GET", "/api/course/start-insert-comment", [400, 401, 404])
export const useApiStartNewComment = createApiHook(apiStartNewComment);

export const apiInsertComment = build<CommentNewReq, string>("POST", "/api/course/insert-comment", [400, 401, 404])

export interface CommentRelated {
  comment_id: number;
}

export const apiStartUpdateComment = build<CommentRelated, CommentEditReq>("GET", "/api/course/start-update-comment", [400, 401, 404])
export const useApiStartUpdateComment = createApiHook(apiStartUpdateComment);

export const apiUpdateComment = build<CommentEditReq, string>("POST", "/api/course/update-comment", [400, 401, 404])
export const useApiUpdateComment = createApiHook(apiUpdateComment);

export const apiDeleteComment = build<CommentRelated, Course>("POST", "/api/course/delete-comment", [400, 401, 404])

export const apiMyComments = build<{}, Comment[]>("GET", "/api/course/my-comments", [400, 401, 404]);
export const useApiMyComments = createApiHook(apiMyComments);