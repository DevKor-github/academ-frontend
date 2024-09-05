import Spinner from "@/components/basic/spinner";

/** TODO : use skeleton loading screen */
export default function LectureLoading() {
  return (
    <div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner /></div>
  );
}
