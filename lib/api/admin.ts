import { build } from '@/lib/api/builder/backend';

export const apiCheckOnline = build<{}, null>('GET', '/api/is-secure', []);

export const apiUploadLectures = build<unknown, null>('POST', '/api/admin/insert-course-database', [400, 401, 404], {
  //   headers: {
  //     'Content-Type': 'application/json',
  // },
});
