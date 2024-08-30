import { build } from './builder';

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
export const apiNoticeDetail = build<NoticeDetailRequest, Notice>('GET', '/api/notice/detail');
