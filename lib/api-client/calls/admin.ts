import { build } from '@/lib/api-client/builder';

import withTokenInstance from '../instances/withTokenOnce';

export const apiCheckOnline = build<Record<string, never>, null>(withTokenInstance, 'GET', '/api/is-secure');

export const apiUploadLectures = build<unknown, null>(withTokenInstance, 'POST', '/api/admin/insert-course-database', {
  //   headers: {
  //     'Content-Type': 'application/json',
  // },
});
