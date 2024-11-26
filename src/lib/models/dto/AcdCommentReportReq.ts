interface AcdCommentReportReq extends AcdCommentRelated {
  reason: 'PROFANITY' | 'INSINCERE' | 'SEXUAL' | 'PERSONAL' | 'OTHER';
  detail: string;
}
