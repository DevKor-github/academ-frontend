import { build } from '@/lib/api/builder';
import withRefresh from '../instances/withRefresh';

export const apiBuyAcess = build<{ item: string }, null>(withRefresh, 'POST', '/api/mypage/buy-access-authority');
