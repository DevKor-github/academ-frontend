"use client";

import { Course } from "@/lib/models/course";
import { useEffect, useState } from "react";

import { useApiCourseDetail } from "@/lib/api/course";
import LectureLoading from "./loading";

import dynamic from "next/dynamic";

const ErrorTemplate = dynamic(() => import("@/lib/template"), { ssr: false, loading : LectureLoading });
const LectureView = dynamic(() => import('./main'), { ssr: false, loading : LectureLoading });

export default function LectureFetch({ params: { id } }: { params: { id: number } }) {
  
  const course = useApiCourseDetail({ course_id: id });
  
  if (course === null) {
    return <LectureLoading />;
  }

  return (course.status === 'SUCCESS') ? <LectureView course={course.data} /> : <ErrorTemplate title={course.code.toString()} subtitle="오류"/> 
}