interface ReqCourseRelated {
  course_id: number;
}

interface ReqSearch {
  keyword: string;
}
interface ReqSearchCourse extends ReqSearch {
  // order: SearchOrdering;
  order: string; // TODO
  page: number;
}

interface ReqCourseDetail extends ReqCourseRelated {
  order: string;
  page: number;
}
