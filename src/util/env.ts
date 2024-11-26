export const ENV_KEYS = [
  'NEXT_PUBLIC_BACKEND_API_URL',
  'NEXT_PUBLIC_BUG_REPORT',
  'NEXT_PUBLIC_CUSTOMER_SURVEY',
] as const;

export type EnvKey = (typeof ENV_KEYS)[number];
