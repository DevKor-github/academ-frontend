import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { COOKIE_AUTH_TOKEN, COOKIE_REFRESH_TOKEN } from '@/lib/directive.server';

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_AUTH_TOKEN);
  cookieStore.delete(COOKIE_REFRESH_TOKEN);

  // remove all cached data
  revalidatePath('/', 'layout');
  redirect('/');
}
