import dynamic from "next/dynamic";
import MyPageLoading from "./loading";

const MyPage = dynamic(() => import('./client'), { ssr: false, loading: MyPageLoading });

export default MyPage;