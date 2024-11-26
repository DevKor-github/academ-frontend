export function getTagFromCourse(course: Course) {
  const threshhold = 0.5;

  // console.log(course.COUNT_teach_t2_practice);

  return [
    course.count_teach_t1_theory / course.count_comments > threshhold ? ['이론 수업'] : [],
    course.count_teach_t2_practice / course.count_comments > threshhold ? ['실습 수업'] : [],
    course.count_teach_t3_seminar / course.count_comments > threshhold ? ['세미나형 수업'] : [],
    course.count_teach_t4_discussion / course.count_comments > threshhold ? ['토론형 수업'] : [],
    course.count_teach_t5_presentation / course.count_comments > threshhold ? ['발표형 수업'] : [],
    course.count_learn_t1_theory / course.count_comments > threshhold ? ['지식 습득에 도움'] : [],
    course.count_learn_t2_thesis / course.count_comments > threshhold ? ['논문 작성에 도움'] : [],
    course.count_learn_t3_exam / course.count_comments > threshhold ? ['시험 대비에 도움'] : [],
    course.count_learn_t4_industry / course.count_comments > threshhold ? ['실무 적용에 도움'] : [],
  ]
    .flat(1)
    .slice(0, 3);
}
