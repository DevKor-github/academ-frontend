'use client';

import { useContext } from 'react';
import { apiCheckOnline } from '@/lib/api-client/calls/admin';
import { useEffect, useState } from 'react';
import { APP_VERSION } from '@/lib/directive';
import { AuthTokensContext } from '@/lib/context/AuthTokensContext';

export default function DiagnosticClient() {
  const [{ instances }] = useContext(AuthTokensContext);
  const [str, setStr] = useState('연결 시도 중..');

  useEffect(() => {
    apiCheckOnline(instances.basic, {})
      .then((a) => {
        setStr(a.version);
      })
      .catch((e) => setStr(String(e)));
  }, [instances.basic]);

  return (
    <div>
      Academ Frontend 버전: {APP_VERSION}
      <br />
      Academ Backend와의 연결 상태는 다음과 같습니다: {str}
    </div>
  );
}
