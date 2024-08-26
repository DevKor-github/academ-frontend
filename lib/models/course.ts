interface Course {
  course_id: number;
  course_code: string;
  graduate_school: string;
  department: string;
  year: number;
  semester: string;
  name: string;
  professor: string;
  credit: string;
  time_location: string;
  count_comments: number;
  avg_rating: number;
  avg_r1_amount_of_studying: number;
  avg_r2_difficulty: number;
  avg_r3_delivery_power: number;
  avg_r4_grading: number;
  count_teach_t1_theory: number;
  count_teach_t2_practice: number;
  count_teach_t3_seminar: number;
  count_teach_t4_discussion: number;
  count_teach_t5_presentation: number;
  count_learn_t1_theory: number;
  count_learn_t2_thesis: number;
  count_learn_t3_exam: number;
  count_learn_t4_industry: number;
  comments: AcdComment[];
}

interface CourseWithBookmark extends Course {
  isBookmark: boolean;
}

interface SearchRequest {
  keyword: string;
  order: 'NEWEST' | 'RATING_DESC' | 'RATING_ASC';
  page: number;
}

interface CourseId {
  course_id: number;
}

interface CourseDetailRequest extends CourseId {
  order: 'NEWEST' | 'RATING_DESC' | 'RATING_ASC' | 'LIKES_DESC' | 'LIKES_ASC';
  page: number;
}

type AcdCommentNewReq = Omit<
  AcdComment,
  'username' | 'profile_id' | 'created_at' | 'updated_at' | 'likes' | 'comment_id'
> & { course_id: number };

type AcdCommentEditReq = Omit<AcdComment, 'username' | 'profile_id' | 'created_at' | 'updated_at' | 'likes'>;


type AcdCommentMeet = AcdComment & AcdCommentNewReq & AcdCommentEditReq;

type AcdCommentJoin = AcdComment | AcdCommentNewReq | AcdCommentEditReq;


interface AcdCommentReportReq extends AcdCommentRelated {
  reason: 'PROFANITY' | 'INSINCERE' | 'SEXUAL' | 'PERSONAL' | 'OTHER';
  detail: string;
}