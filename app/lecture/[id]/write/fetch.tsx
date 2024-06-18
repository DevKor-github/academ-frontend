"use client";

import { useLayoutEffect } from "react"

import { apiCourseDetail, apiStartNewComment } from "@/lib/api/search";
import { useRouter } from "next/navigation";
import { useState } from "react";

import WriteComment from "./write";
import WriteError from "./err";

import { Course } from "@/lib/models/course";

export default async function WritePage({ params: { id } }: { params: { id: number } }) {
  
  const course : Course | null = await apiStartNewComment({ course_id: id }).then(
    (a) => {
      if (a.status === "SUCCESS") {
        if (a.code === 200) {
          return apiCourseDetail({ course_id: id }).then(
            (a) => {
              if (a.status === "SUCCESS") {
                return(a.data);
              }
              else {
                return(null);
              }
            }
          )
        }
        else {
          return(null);
        }
      }
      else if (a.status === "ERROR") {
        return (null);
      }
      else {
        return (null);
      }
    }
  );

  return course !== null ?
      <WriteComment course={course} />
      : <WriteError code={-1} />;
}