'use server';

import apiGetNotices from '@/lib/api/calls/notice';
// import { cache } from 'react';

export default async function PrivacyPolicy() {
  const ns = await apiGetNotices();

  const tou = ns.find((n) => n.tag.includes("latest") && n.tag.includes("privacy_policy"))

  if (tou === undefined) {
    return Promise.reject(new Error("no privacy policy"));
  }

  return tou.content;
};