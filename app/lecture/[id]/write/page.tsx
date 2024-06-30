"use client";

import { useApiCourseDetail, useApiStartNewComment } from "@/lib/api/course";

import ErrorTemplate from "@/lib/template";
import WriteLoading from "./loading";

import dynamic from "next/dynamic";

import { useSessionId } from "@/context/SessionIdContext";

const WriteComment = dynamic(() => import('./write'), { ssr: false, loading: WriteLoading });

export default function WritePage({ params: { id } }: { params: { id: number } }) {

  const [jwt] = useSessionId();
  
  const writable = useApiStartNewComment({ course_id: id }, jwt);
  const course = useApiCourseDetail({ course_id: id }, jwt);

  if (course === null || writable === null) {
    return <WriteLoading />
  }

  return  course.status === 'SUCCESS' && writable.status === 'SUCCESS' && writable.code === 200 ? <WriteComment course={course.data} />
    : <ErrorTemplate title={writable.code.toString()} subtitle={"강의평을 작성할 수 없습니다. 다음 메시지와 함께 실패하였습니다: " + writable.message} />
}