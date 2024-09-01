import ChangePWLoading from './loading';

import dynamic from 'next/dynamic';

const ChangePW = dynamic(() => import('./client'), { ssr: false, loading: ChangePWLoading });

export default function ChangePWPage() {
  return <ChangePW />;
}
