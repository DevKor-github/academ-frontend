'use client';

import { apiCheckOnline } from '@/lib/api/calls/admin';
import { useEffect, useState } from 'react';
import { APP_VERSION } from '@/lib/directive';

export default function DiagnosticClient() {
  const [str, setStr] = useState('연결 시도 중..');

  useEffect(() => {
    apiCheckOnline({})
      .then((a) => {
        setStr(a.version);
      })
      .catch((e) => setStr(String(e)));
  }, []);

  return (
    <div>
      Academ Frontend 버전: {APP_VERSION}
      <br />
      Academ Backend와의 연결 상태는 다음과 같습니다: {str}
    </div>
  );
}
