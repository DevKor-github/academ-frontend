import { apiUpdateComment, CommentEditReq } from "@/lib/api/course";
import { useEffect, useState } from "react";
import Submitted from "./submitted";

import WriteOrEditComment from "@/components/composite/form";

export default function EditComment({ comment, courseName }: { comment: CommentEditReq; courseName: string }) {
  
  const [input, setInput] = useState<CommentEditReq>(comment);

  const [submitted, setSubmitted] = useState<boolean | null>(null); 

  function handleSubmit() {
    if (confirm(JSON.stringify(input)) == true) {
      apiUpdateComment(input).then(
        (s) => {
          if (s.status === 'SUCCESS') {
            setSubmitted(true)
          } else {
            setSubmitted(false);
          }
        });
    }
  };

  if (submitted !== null) {
    return <Submitted success={submitted} />
  }
            
  return <WriteOrEditComment title={
    <span className="text-2xl ">
    `{courseName}`       <span className="text-base ">
      강의평 수정하기
    </span>
    </span>
  }
    handleSubmit={handleSubmit}
    input={input}
    setInput={setInput}
  />
}