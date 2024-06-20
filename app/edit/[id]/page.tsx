"use client";

import { useApiCourseDetail, useApiStartUpdateComment } from "@/lib/api/search";

import ErrorTemplate from "@/lib/template";
import EditLoading from "./loading";

import dynamic from "next/dynamic";

const EditComment = dynamic(() => import('./edit'), { ssr: false, loading: EditLoading });

export default function EditPage({ params: { id } }: { params: { id: number } }) {
  
  const editable = useApiStartUpdateComment({ comment_id: id });
  const course = useApiCourseDetail({ course_id: id });

  if (course === null || editable === null) {
    return <EditLoading />
  }

  return  course.status === 'SUCCESS' && editable.status === 'SUCCESS' && editable.code === 200 ? <EditComment courseName={course.data.name} comment={editable.data} />
    : <ErrorTemplate title={editable.code.toString()} subtitle={"강의평을 작성할 수 없습니다. 다음 메시지와 함께 실패하였습니다: " + editable.message} />
}