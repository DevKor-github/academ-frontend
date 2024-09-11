import { build } from '@/lib/api/builder';

export const apiBuyAcess = build<{ item: string }, null>('POST', '/api/mypage/buy-access-authority');
