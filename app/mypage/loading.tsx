import Spinner from '@/components/basic/spinner';

export default function MyPageLoading() {
  return (
    <div className="w-full p-8 flex flex-row justify-center items-center text-6xl">
      <Spinner />
    </div>
  );
}
