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
      .catch(() => setStr('실패'));
  }, []);

  return (
    <div>
      Academ Backend와의 연결 상태는 다음과 같습니다:
      <br />
      {str}
    </div>
  );
}
