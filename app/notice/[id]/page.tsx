'use client';

import { useSessionId } from '@/context/SessionIdContext';
import { useApiNoticeDetail } from '@/lib/api/notice';
import NoticeView from './main';
import ErrorTemplate from '@/lib/template';


export default function NoticeDetailPage({ params: { id } }: { params: { id: number } }) {
  const [jwt] = useSessionId();

  const { loading, response: notice} = useApiNoticeDetail({ notice_id: id }, { token: jwt?.accessToken });

  if (loading) {
    return <div />;
  }

  return notice.status === 'SUCCESS' ? (
    <NoticeView notice={notice.data} />
  ) : (
    <ErrorTemplate title={notice.statusCode.toString()} subtitle='="오류' />
  );
}
