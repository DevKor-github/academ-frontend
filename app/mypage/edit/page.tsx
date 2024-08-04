import MyPageEditBasicLoading from './loading';

import dynamic from 'next/dynamic';

const MyPageEditBasic = dynamic(() => import('./client'), { ssr: false, loading: MyPageEditBasicLoading });

export default function EditPage() {
  return <div />;
}
