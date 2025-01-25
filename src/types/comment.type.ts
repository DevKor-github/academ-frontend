import z from 'zod';

export const AcdCommentRelated = z.object({
  comment_id: z.number(),
});

export type AcdCommentRelated = z.infer<typeof AcdCommentRelated>;

////////////////////////////////////////

export const AcdCommentSchema = z.object({
  comment_id: z.number(),
  username: z.string(),
  profile_id: z.number(),
  rating: z.number(),
  r1_amount_of_studying: z.number(),
  r2_difficulty: z.number(),
  r3_delivery_power: z.number(),
  r4_grading: z.number(),
  review: z.string(),
  teach_t1_theory: z.boolean(),
  teach_t2_practice: z.boolean(),
  teach_t3_seminar: z.boolean(),
  teach_t4_discussion: z.boolean(),
  teach_t5_presentation: z.boolean(),
  learn_t1_theory: z.boolean(),
  learn_t2_thesis: z.boolean(),
  learn_t3_exam: z.boolean(),
  learn_t4_industry: z.boolean(),
  likes: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  already_like: z.boolean(),
});

export type AcdComment = z.infer<typeof AcdCommentSchema>;

const AcdMyCommentSchema = z.object({
  comment_id: z.number(),
  course_id: z.number(),
  course_code: z.string(),
  graduate_school: z.string(),
  department: z.string(),
  year: z.number(),
  semester: z.number(),
  name: z.string(),
  professor: z.string(),
  credit: z.number(),
  time_location: z.string(),
  review: z.string(),
  likes: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  reward: z.boolean(),
  rating: z.number(),
  r1_amount_of_studying: z.number(),
  r2_difficulty: z.number(),
  r3_delivery_power: z.number(),
  r4_grading: z.number(),
  teach_t1_theory: z.boolean(),
  teach_t2_practice: z.boolean(),
  teach_t3_seminar: z.boolean(),
  teach_t4_discussion: z.boolean(),
  teach_t5_presentation: z.boolean(),
  learn_t1_theory: z.boolean(),
  learn_t2_thesis: z.boolean(),
  learn_t3_exam: z.boolean(),
  learn_t4_industry: z.boolean(),
});

export type AcdMyComment = z.infer<typeof AcdMyCommentSchema>;

////////////////////////////////////////
////// create request //////////////////
////////////////////////////////////////

const AcdCommentNewReqSchema = z.object({
  course_id: z.number(),
  rating: z.number(),
  r1_amount_of_studying: z.number(),
  r2_difficulty: z.number(),
  r3_delivery_power: z.number(),
  r4_grading: z.number(),
  review: z.string(),
  teach_t1_theory: z.boolean(),
  teach_t2_practice: z.boolean(),
  teach_t3_seminar: z.boolean(),
  teach_t4_discussion: z.boolean(),
  teach_t5_presentation: z.boolean(),
  learn_t1_theory: z.boolean(),
  learn_t2_thesis: z.boolean(),
  learn_t3_exam: z.boolean(),
  learn_t4_industry: z.boolean(),
});

export type AcdCommentNewReq = z.infer<typeof AcdCommentNewReqSchema>;

////////////////////////////////////////
////// edit request ////////////////////
////////////////////////////////////////

const AcdCommentEditReqSchema = z.object({
  comment_id: z.number(),
  rating: z.number(),
  r1_amount_of_studying: z.number(),
  r2_difficulty: z.number(),
  r3_delivery_power: z.number(),
  r4_grading: z.number(),
  review: z.string(),
  teach_t1_theory: z.boolean(),
  teach_t2_practice: z.boolean(),
  teach_t3_seminar: z.boolean(),
  teach_t4_discussion: z.boolean(),
  teach_t5_presentation: z.boolean(),
  learn_t1_theory: z.boolean(),
  learn_t2_thesis: z.boolean(),
  learn_t3_exam: z.boolean(),
  learn_t4_industry: z.boolean(),
});

export type AcdCommentEditReq = z.infer<typeof AcdCommentEditReqSchema>;

////////////////////////////////////////
////// report request //////////////////
////////////////////////////////////////

const AcdCommentReportReqSchema = z.object({
  comment_id: z.number(),
  reason: z.enum(['PROFANITY', 'INSINCERE', 'SEXUAL', 'PERSONAL', 'OTHER']),
  detail: z.string(),
});

export type AcdCommentReportReq = z.infer<typeof AcdCommentReportReqSchema>;

export type AcdCommentReqJoin = AcdCommentEditReq | AcdCommentNewReq;

////////////////////////////////////////
////// order of comment ////////////////
////////////////////////////////////////
// (TODO) move somewhere else

const AcdCommentOrderingSchema = z.enum(['NEWEST', 'RATING_DESC', 'RATING_ASC', 'LIKES_DESC', 'LIKES_ASC']);

export type AcdCommentOrdering = z.infer<typeof AcdCommentOrderingSchema>;
