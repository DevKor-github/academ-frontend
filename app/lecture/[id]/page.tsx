
import dynamic from "next/dynamic";
import {BasicInfoViewLoading} from "./components/basicinfo";

const LectureFetch = dynamic(() => import('./fetch'), {
  ssr: false, loading: () => (
    <div className="flex flex-col w-full h-full">
    <BasicInfoViewLoading />
    </div>
) });

export default function LecturePage({ params: { id } }: { params: { id: number } }) {
  return (<LectureFetch id={id} />);
}