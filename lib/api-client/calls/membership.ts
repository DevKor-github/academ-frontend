import { build } from '@/lib/api-client/builder';
import withRefreshResolved from '../instances/withRefreshResolved';

export const apiBuyAcess = build<{ item: string }, null>(
  withRefreshResolved,
  'POST',
  '/api/mypage/buy-access-authority',
);
