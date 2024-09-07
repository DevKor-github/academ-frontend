export interface Notice {
  notice_id: number;
  title: string;
  created_at: string;
}

export interface NoticeDetailed extends Notice {
  detail: string;
}

export interface NoticeListRequest {
  page: number;
}

export interface NoticeDetailRequest {
  notice_id: number;
}
