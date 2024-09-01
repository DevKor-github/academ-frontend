'use client';

import { useSessionId } from '@/context/SessionIdContext';
import { apiNoticeList } from '@/lib/api/notice';
import { useEffect } from 'react';
import NoticeSingle from './NoticeSingle';
import { HStack } from '@/components/basic/stack';
import { Notice } from '@/lib/api/notice';
import Button from '@/components/basic/button';
import { DownIcon } from '@/icons';
import { usePagination } from '@/lib/hooks/pagination';
import {Spinner2} from '@/components/basic/spinner';

function NoticeListView({
  notices,
  showMoreButton,
}: {
    notices: Notice[];
    showMoreButton : React.ReactNode
}) {
  return (
    <div>
      <HStack gap="20px">
        <div>
          {notices.map((notice) => (
            <NoticeSingle key={notice.notice_id} notice={notice} />
          ))}
        </div>
        {showMoreButton}
      </HStack>
    </div>
  );
}

export default function NoticeResultsView() {
  const [jwt] = useSessionId();

  const [pages, fetchThis] = usePagination(apiNoticeList);

  const fetchNext = () => fetchThis({ page: pages.page + 1 }, { token: jwt?.accessToken });
  
  useEffect(fetchNext, []);

  if (pages.totalLoadingState === 'bot') {
    return (<div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner2 /></div>);
  }

  const showMoreButton = (
    <div className="w-full pt-6 flex flex-col justify-center items-center">
    {(pages.loading ? <Spinner2 /> : (pages.eoc ? <div>모두 불러왔습니다.</div>  : <Button kind='blank' onClick={fetchNext}>
      <DownIcon />
    </Button>))}
  </div>)

  return <NoticeListView notices={pages.data} showMoreButton={showMoreButton} />;
}
