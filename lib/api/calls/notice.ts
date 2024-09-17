export interface Notice {
  notice_id: number;
  title: string;
  created_at: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  image_5?: string;
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
