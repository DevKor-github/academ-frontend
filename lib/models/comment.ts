interface AcdComment {
  comment_id: number;
  username: string;
  profile_id: number;
  rating: number;
  r1_amount_of_studying: number;
  r2_difficulty: number;
  r3_delivery_power: number;
  r4_grading: number;
  review: string;
  teach_t1_theory: boolean;
  teach_t2_practice: boolean;
  teach_t3_seminar: boolean;
  teach_t4_discussion: boolean;
  teach_t5_presentation: boolean;
  learn_t1_theory: boolean;
  learn_t2_thesis: boolean;
  learn_t3_exam: boolean;
  learn_t4_industry: boolean;
  likes: number;
  created_at: string;
  updated_at: string;
  already_like: boolean;
}

interface AcdCommentRelated {
  comment_id: number;
}

interface AcdMyComment {
  comment_id: number;
  course_id: number;
  course_code: string;
  graduate_school: string;
  department: string;
  year: number;
  semester: number;
  name: string;
  professor: string;
  credit: number;
  time_location: string;
  review: string;
  likes: number;
  created_at: string;
  updated_at: string;
  reward: boolean;
  rating: number;
  r1_amount_of_studying: number;
  r2_difficulty: number;
  r3_delivery_power: number;
  r4_grading: number;
  teach_t1_theory: boolean;
  teach_t2_practice: boolean;
  teach_t3_seminar: boolean;
  teach_t4_discussion: boolean;
  teach_t5_presentation: boolean;
  learn_t1_theory: boolean;
  learn_t2_thesis: boolean;
  learn_t3_exam: boolean;
  learn_t4_industry: boolean;
}
