import { build } from '@/lib/api-client/builder';

export const apiCheckOnline = build<Empty, null>('get', 'api/is-secure');

export const apiUploadLectures = build<Empty, null>('post', 'api/admin/insert-course-database', {
  'Content-Type': 'application/json',
});
