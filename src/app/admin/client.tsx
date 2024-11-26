'use client';

import { useState } from 'react';

import Button from '@/components/basic/button';
import { apiUploadLectures } from '@/lib/api-client/calls/admin';
import Spinner from '@/components/basic/spinner';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';

export default function AdminPageInner() {
  const [{ instances }] = useAuthTokens();
  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    event.preventDefault();
    if (!jsonContent) {
      alert('파일이 없습니다.');
      return;
    }

    setLoading(true);

    const ret = await apiUploadLectures(instances.doRefresh, JSON.parse(jsonContent));

    setLoading(false);

    if (ret.status === 'SUCCESS') {
      alert('업로드가 완료되었습니다.');
      setJsonContent(null);
    } else {
      alert('업로드에 실패했습니다. ' + JSON.stringify(ret));
    }
  };

  return (
    <main className="md:p-8">
      <h1 className=" text-2xl font-bold pb-2">관리자용 대시보드</h1>
      <h2 className=" text-xl  pb-2">대학원용 강의 데이터베이스 추가</h2>
      <form
        className="pt-2 pb-2 gap-2 flex flex-col w-96"
        action="/upload"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input className="w-fill" type="file" id="file" name="file" onChange={handleFileChange} />
        <Button disabled={jsonContent === null || loading} type="submit">
          {loading ? <Spinner /> : '업로드'}
        </Button>
      </form>
    </main>
  );
}
