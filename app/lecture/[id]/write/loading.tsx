import Spinner from '@/component/basic/spinner';

export default function WriteLoading() {
  return (
    <div className="w-full h-full flex justify-center items-center text-4xl">
      <Spinner />
    </div>
  );
}
