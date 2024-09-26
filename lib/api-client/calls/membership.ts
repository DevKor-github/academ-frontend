import { build } from '@/lib/api-client/builder';
import doRefresh from '../instances/\bwithRefresh';

export const apiBuyAcess = build<{ item: string }, null>(doRefresh, 'POST', '/api/mypage/buy-access-authority');
