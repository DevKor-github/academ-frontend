import { build } from '@/lib/api-client/builder';

export const apiCheckOnline = build<Record<string, never>, null>('GET', '/api/is-secure');

export const apiUploadLectures = build<unknown, null>('POST', '/api/admin/insert-course-database', {
  //   headers: {
  //     'Content-Type': 'application/json',
  // },
});
