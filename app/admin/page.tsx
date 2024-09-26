import { IS_DEBUG } from "@/lib/directive";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

/* Note that source of this page is OK to be shown in client for non-admin
   users. but it would be better to find some better way to exclude */
const AdminPage = dynamic(() => import('./client'), { ssr: false });

const AdminPageInnter = IS_DEBUG
  ? () => (<AdminPage />)
  : () => { notFound() };

export default AdminPageInnter;
