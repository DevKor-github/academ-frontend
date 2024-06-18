
import { build } from '@/lib/api/builder/backend';
import { Course } from '../models/course';
import { Comment } from '../models/comment';

export interface SearchRequest {
  keyword: string;
}

export interface CourseRelatedRequest {
  course_id: number;
}

export type CommentNewReq = Omit<Comment, "profile_username" | "created_at" | "updated_at" | "likes" | "comment_id"> & { "course_id" : number };
export type CommentEditReq = Omit<Comment, "profile_username" | "created_at" | "updated_at" | "likes">;



export const apiSearch = build<SearchRequest, Course[]>("GET", "/api/course/search", [400, 401, 404])

export const apiBookmark = build<CourseRelatedRequest, Course[]>("GET", "/api/course/bookmark", [400, 401, 404])

export const apiCourseDetail = build<CourseRelatedRequest, Course>("GET", "/api/course/detail", [400, 401, 404])

export const apiStartNewComment = build<CourseRelatedRequest, Course>("GET", "/api/course/start-insert-comment", [400, 401, 404])

export const apiInsertComment = build<CommentNewReq, string>("POST", "/api/course/insert-comment", [400, 401, 404])

export const apiStartUpdateComment = build<CourseRelatedRequest, Course>("GET", "/api/course/start-update-comment", [400, 401, 404])

export const apiUpdateComment = build<CommentEditReq, string>("POST", "/api/course/update-comment", [400, 401, 404])

export const apiDeleteComment = build<CourseRelatedRequest, Course>("POST", "/api/course/delete-comment", [400, 401, 404])
