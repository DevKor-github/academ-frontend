
"use client";

import { useState } from "react";

import Button from "@/components/basic/button";
import { apiUploadLectures } from "@/lib/api/admin";

export default function AdminPageInner() {

  const [jsonContent, setJsonContent] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
        reader.onload = (e) => {
              setJsonContent(e.target?.result as string);
          };
          reader.readAsText(file);
      }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  
    alert(jsonContent);

    event.preventDefault();
    if (!jsonContent) {
        return;
    }

  const ret = await apiUploadLectures(JSON.parse(jsonContent));

  if (ret.status === "SUCCESS") {
    alert("업로드가 완료되었습니다.");
    setJsonContent(null);
  } else {
    alert("업로드에 실패했습니다. " + ret.data);
  }

};

  return <main className="md:p-8">
    <h1>관리자용 대시보드</h1>
    <h2>대학원용 강의 데이터베이스 추가</h2>
    <form action="/upload" method="post" encType="multipart/form-data" onSubmit={handleSubmit} >
        <label htmlFor="file">Choose a file: </label>
        <input type="file" id="file" name="file" onChange={handleFileChange}  />
        <Button disabled={jsonContent === null} type="submit" >upload</Button>
    </form>
  </main>
}