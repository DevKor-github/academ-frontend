import { build } from '@/lib/api/builder';

import basicInstance from '../instances/basicInstance';
import withTokenInstance from '../instances/withTokenOnce';

export const apiCheckOnline = build<Record<string, never>, null>(basicInstance, 'GET', '/api/is-secure');

export const apiUploadLectures = build<unknown, null>(withTokenInstance, 'POST', '/api/admin/insert-course-database', {
  //   headers: {
  //     'Content-Type': 'application/json',
  // },
});
