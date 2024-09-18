'use server';

// pages/asyncComponent.js
import apiGetNotices from '@/lib/api/calls/notice';
// import { cache } from 'react';

export default async function TermsOfUse() {
  const ns = await apiGetNotices();

  const tou = ns.find((n) => n.tag.includes("latest") && n.tag.includes("terms_of_use"))

  if (tou === undefined) {
    return Promise.reject(new Error("no terms of use"));
  }

  return tou.content;
};