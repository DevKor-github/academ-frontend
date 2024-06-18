import dynamic from "next/dynamic";
import WriteLoading from "./loading";

const Page = dynamic(() => import('./fetch'), { ssr: false, loading: WriteLoading });

export default Page;