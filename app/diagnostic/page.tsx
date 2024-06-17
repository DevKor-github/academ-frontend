"use client";

import { apiCheckOnline } from "@/api/admin";
import { useEffect } from "react";
import { useState } from "react";


export default function Page() {
  const [str, setStr] = useState('연결 시도 중..');

  useEffect(() => { apiCheckOnline({}).then((a) => {setStr('연결됨, 버전: ' + a.version) }).catch((e) => setStr('실패'))}, []
  );

  return <div className="p-10 text-xl">{`Academ Backend Server 상태 : ${str}`}</div>;
}
