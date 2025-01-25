import z from 'zod';
import { AcdCommentSchema } from './comment.types';

const CourseOnlySchema = z.object({
  course_id: z.number(),
  course_code: z.string(),
  class_number: z.string(),
  graduate_school: z.string(),
  department: z.string(),
  year: z.number(),
  semester: z.string(),
  name: z.string(),
  professor: z.string(),
  credit: z.string(),
  time_location: z.string(),
  count_comments: z.number(),
  isBookmark: z.boolean(),
  comments: z.unknown(),
});

export type CourseOnly = z.infer<typeof CourseOnlySchema>;

const CourseSchema = CourseOnlySchema.merge(
  z.object({
    avg_rating: z.number(),
    avg_r1_amount_of_studying: z.number(),
    avg_r2_difficulty: z.number(),
    avg_r3_delivery_power: z.number(),
    avg_r4_grading: z.number(),
    count_teach_t1_theory: z.number(),
    count_teach_t2_practice: z.number(),
    count_teach_t3_seminar: z.number(),
    count_teach_t4_discussion: z.number(),
    count_teach_t5_presentation: z.number(),
    count_learn_t1_theory: z.number(),
    count_learn_t2_thesis: z.number(),
    count_learn_t3_exam: z.number(),
    count_learn_t4_industry: z.number(),
    comments: AcdCommentSchema.array(),
  }),
);

export type Course = z.infer<typeof CourseSchema>;

const CourseSearchOrderingSchema = z.enum(['NEWEST', 'RATING_DESC', 'RATING_ASC']);

export type CourseSearchOrdering = z.infer<typeof CourseSearchOrderingSchema>;
