import { build } from '@/lib/api-client/builder';

import withTokenOnce from '../instances/withToken';

export const apiCheckOnline = build<Record<string, never>, null>(withTokenOnce, 'GET', '/api/is-secure');

export const apiUploadLectures = build<unknown, null>(withTokenOnce, 'POST', '/api/admin/insert-course-database', {
  //   headers: {
  //     'Content-Type': 'application/json',
  // },
});
