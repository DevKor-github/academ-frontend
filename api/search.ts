
import { build } from '@/api/builder/backend';
import { Course } from './models/course';
import { Comment } from './models/comment';

export interface SearchRequest {
  keyword: string;
}
export const apiSearch = build<SearchRequest, Course[]>("GET", "/api/course/search", [400, 401, 404])

export interface CourseRelatedRequest {
  course_id: number;
}

export const apiBookmark = build<CourseRelatedRequest, Course[]>("GET", "/api/course/bookmark", [400, 401, 404])

export const apiCourseDetail = build<CourseRelatedRequest, Course>("GET", "/api/course/detail", [400, 401, 404])

export const apiStartComment = build<CourseRelatedRequest, Course>("GET", "/api/course/start-comment", [400, 401, 404])

export const apiInsertComment = build<Comment, string>("POST", "/api/course/insert-comment", [400,401, 404])