import dynamic from 'next/dynamic.js';

function MyPageLoading() {
  return <main className='w-full h-full p-8'>...</main>;
}

const ProfilePage =  dynamic(() => import('./client'), { ssr: false, loading : MyPageLoading});

export default ProfilePage

