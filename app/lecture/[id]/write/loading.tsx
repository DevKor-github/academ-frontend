import Spinner from '@/components/basic/spinner';
import { VStack, HStack } from '@/components/basic/stack';
import Tag from '@/components/basic/tag';
import Skeleton from '@/components/composite/skeleton';

export default function WriteLoading() {
  return (
    <div className='w-full h-full flex justify-center items-center text-4xl'><Spinner /></div>
  );
}
