import { Comment } from './comment';

export interface Course {
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
  comments: Comment[];
}
