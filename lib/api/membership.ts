import { build } from '@/lib/api/builder';
import withTokenInstance from './instances.ts/withTokenInstance';

export const apiBuyAcess = build<{ item: string }, null>(withTokenInstance, 'POST', '/api/mypage/buy-access-authority');
