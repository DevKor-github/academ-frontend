"use client";

import { useLayoutEffect } from "react"

import { apiStartComment } from "@/api/search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/basic/button";

export default function WritePage({ params: { id } }: { params: { id: number } }) {

  const [avail, setAvail] = useState<boolean | undefined>(undefined);
  
  const route = useRouter();

  useLayoutEffect(() => {
    apiStartComment({ course_id: id }).then(
      (a) => {
        if (a.status === "SUCCESS") {
          setAvail(true);
        }
        else {
          setAvail(false);
        }
      }
    )
    
  } , []);

  return <main>
    <form>

    ... 강의 강의평 작성하기

    강의 별점 선택

    항목별 평가

    태그 선택

    강의평 작성

      <Button type="submit">강의평 제출하기</Button>

    </form>
  </main>
  
}