interface ReqSearch {
  keyword: string;
}
interface ReqSearchCourse extends ReqSearch {
  // order: SearchOrdering;
  order: string; // TODO
  page: number;
}
