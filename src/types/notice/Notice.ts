interface Notice<DateExpression = Date> extends NoticeMetadata<DateExpression> {
  filename: string;
  content: React.ReactNode;
}
