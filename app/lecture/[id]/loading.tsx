import { VStack, HStack } from '@/components/basic/stack';
// import BookmarkToggleButton from "@/components/composite/bookmarkToggleButton";
import Tag from '@/components/basic/tag';
import Skeleton from '@/components/composite/skeleton';

import Spinner from '@/components/basic/spinner';

/** TODO : use skeleton loading screen */
export default function LectureLoading() {
  return (
    <div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner /></div>
  );
}
