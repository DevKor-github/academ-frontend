
import { IS_DEBUG } from '@/lib/directive';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
const AdminPageClient = dynamic(() => import('./components/admin.page'));

// TODO check user permission using token
export default function AdminPage() {
  if (IS_DEBUG) {
    return <AdminPageClient />;
  }

  notFound();
}