'use client';

import { useSessionId } from '@/context/SessionIdContext';
import { apiNoticeList } from '@/lib/api/notice';
import { useEffect, useState } from 'react';
import NoticeSingle from './NoticeSingle';
import { HStack } from '@/components/basic/stack';
import { Notice } from '@/lib/api/notice';
import Button from '@/components/basic/button';
import { DownIcon } from '@/icons';

function NoticeListView({
  notices,
  setPage,
  eon,
}: {
  notices: Notice[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  eon: boolean;
}) {
  return (
    <div>
      <HStack gap="20px">
        <div>
          {notices.map((notice) => (
            <NoticeSingle key={notice.notice_id} notice={notice} />
          ))}
        </div>
        {eon || (
          <div className="w-full pt-6 flex flex-col justify-center items-center">
            <Button
              onClick={() =>
                setPage((v) => {
                  return v + 1;
                })
              }
            >
              <DownIcon />
            </Button>
          </div>
        )}
      </HStack>
    </div>
  );
}

export default function NoticeResultsView() {
  const [jwt] = useSessionId();
  const [notices, setNotices] = useState<null | Notice[]>(null);
  const [page, setPage] = useState(1);
  const [EON, setEON] = useState<boolean>(false);

  useEffect(() => {
    apiNoticeList({ page: page }, { token: jwt?.accessToken }).then((a) => {
      if (a.status === 'SUCCESS') {
        if (a.data.length < 10) {
          setEON(true);
        }

        if (page === 1) {
          setNotices(a.data);
        } else {
          setNotices((notices || []).concat(a.data));
        }
      } else if (a.statusCode == 404) {
        setNotices(notices || []);
        setEON(true);
      } else {
      }
    });
  }, [page]);

  if (notices === null) {
    return <div>공지사항이 없습니다.</div>;
  } else {
    return <NoticeListView notices={notices} setPage={setPage} eon={EON} />;
  }
}
