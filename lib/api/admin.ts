import { build } from '@/lib/api/builder';

export const apiCheckOnline = build<{}, null>('GET', '/api/is-secure');

export const apiUploadLectures = build<unknown, null>('POST', '/api/admin/insert-course-database', {
  //   headers: {
  //     'Content-Type': 'application/json',
  // },
});
