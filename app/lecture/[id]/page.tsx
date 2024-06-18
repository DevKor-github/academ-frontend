import dynamic from "next/dynamic";
import LectureLoading from "./loading";

const Page = dynamic(() => import('./fetch'), { ssr: false, loading: LectureLoading });

export default Page;