interface NoticeMetadata<DateExpression> extends Record<string, unknown> {
  title: string;
  created_at: DateExpression;
}
