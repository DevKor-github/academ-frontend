export interface NoticeMetadata<DateExpression> extends Record<string, unknown> {
  title: string;
  created_at: DateExpression;
  writer: string;
  tag: string[];
}

export interface Notice<DateExpression = Date> extends NoticeMetadata<DateExpression> {
  filename: string;
  content: React.ReactNode;
}
