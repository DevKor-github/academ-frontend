import { build } from '@/lib/api/builder';

export const apiBuyAcess = build<{ item: string }, null>('POST', '/api/point/buy-access-authority');
