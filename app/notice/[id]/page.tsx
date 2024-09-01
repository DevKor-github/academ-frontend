'use client';

import { useSessionId } from '@/context/SessionIdContext';
import { apiNoticeDetail } from '@/lib/api/notice';
import { useApi } from '@/lib/api/builder';
import NoticeView from './main';
import ErrorTemplate from '@/lib/template';
import { Spinner2 } from '@/components/basic/spinner';

export default function NoticeDetailPage({ params: { id } }: { params: { id: number } }) {
  const [jwt] = useSessionId();

  const { loading, response: notice } = useApi(apiNoticeDetail, { notice_id: id }, { token: jwt?.accessToken });

  if (loading) {
    return <div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner2 /></div>
  }

  return notice.status === 'SUCCESS' ? (
    <NoticeView notice={notice.data} />
  ) : (
    <ErrorTemplate title={notice.statusCode.toString()} subtitle='="오류' />
  );
}
