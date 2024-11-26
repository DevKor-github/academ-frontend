import { build } from '@/lib/api-client/builder';

export const apiBuyAcess = build<{ item: string }, null>('post', 'api/mypage/buy-access-authority');
