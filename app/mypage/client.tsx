"use client";

import { useSessionId } from '../../context/SessionIdContext';

function NoSessionIdFallback() {
  return <div>이 기능을 사용하려면 로그인해야 합니다.</div>
}

export default function MyPage() {
  const { sessionId } = useSessionId();


  return <main>{
    sessionId === null ?
      <NoSessionIdFallback />
      :
      <main className='w-full h-full p-8'>{sessionId.username}님</main>
  }</main>;
}