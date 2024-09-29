import { build } from '@/lib/api-client/builder';

export const apiCheckOnline = build<Empty, null>('GET', 'api/is-secure');

export const apiUploadLectures = build<Empty, null>('POST', 'api/admin/insert-course-database', {
  'Content-Type': 'application/json',
});
