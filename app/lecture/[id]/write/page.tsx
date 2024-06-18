"use client";

import { useLayoutEffect } from "react"

import { apiCourseDetail, apiStartComment } from "@/lib/api/search";
import { useRouter } from "next/navigation";
import { useState } from "react";

import WriteComment from "./write";
import WriteError from "./err";
import WriteLoading from "./loading";

import { Course } from "@/lib/models/course";

export default function WritePage({ params: { id } }: { params: { id: number } }) {

  const [loading, setLoading] = useState<boolean>(true);

  const [course, setCourse] = useState<Course | null>(null);

  
  const route = useRouter();

  useLayoutEffect(() => {
    apiStartComment({ course_id: id }).then(
      (a) => {
        if (a.status === "SUCCESS") {
          if (a.code === 200) {
            apiCourseDetail({ course_id: id }).then(
              (a) =>
              {
                if (a.status === "SUCCESS") {
                  setCourse(a.data);
                }
                else {
                  setCourse(null);
                  }
              }
            )
          }
          else {
            setCourse(null);
          }
        }
        else if (a.status === "ERROR") {
          setCourse(null);
        }
        else {
          setCourse(null);
        }
        setLoading(false);
      }
    )
    
  });

  if (loading) {
    return <WriteLoading />;
  }
  else {
    return course !== null ?
      <WriteComment course={course} />
      : <WriteError code={-1} />;
  }
}