import { build } from './builder';
import { createApiHook } from './builder';

export interface Notice {
  notice_id: number;
  title: string;
  created_at: string;
  detail: string;
}

export interface NoticeListRequest {
  page: number;
}

export interface NoticeDetailRequest {
  notice_id: number;
}

export const apiNoticeList = build<NoticeListRequest, Notice[]>('GET', '/api/notice/list');
export const useApiNoticeList = createApiHook(apiNoticeList);
export const apiNoticeDetail = build<NoticeDetailRequest, Notice>('GET', '/api/notice/detail');
export const useApiNoticeDetail = createApiHook(apiNoticeDetail);
