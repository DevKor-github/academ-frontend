"use client";

import { apiCourseDetail, apiStartNewComment } from "@/lib/api/search";

import WriteComment from "./write";

import { Course } from "@/lib/models/course";
import ErrorTemplate from "@/lib/template";

export default async function WritePage({ params: { id } }: { params: { id: number } }) {
  
  const course : Course | number = await apiStartNewComment({ course_id: id }).then(
    (a) => {
      if (a.status === "SUCCESS") {
        if (a.code === 200) {
          return apiCourseDetail({ course_id: id }).then(
            (a) => {
              if (a.status === "SUCCESS") {
                return(a.data);
              }
              else if (a.status === "ERROR") {
                return a.code;
              }
              else {
                return -1
              }
            }
          )
        }
        else {
          return -1;
        }
      }
      else if (a.status === "ERROR") {
        return a.code
      }
      else {
        return -1;
      }
    }
  );

  return typeof course === 'number' ?
    <ErrorTemplate title={course.toString()} subtitle="강의평을 작성할 수 없습니다. 해당 상태 코드와 함께 실패하였습니다." />
    : <WriteComment course={course} />;
}