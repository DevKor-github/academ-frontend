import { useSearchParams } from 'next/navigation';

export default function useSearchKeyword() {
  const sp = useSearchParams();
  return sp.get('q') ?? undefined;
}
