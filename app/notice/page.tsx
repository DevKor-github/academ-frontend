import { Spinner2 } from '@/components/basic/spinner';
import { HStack } from '@/components/basic/stack';
import dynamic from 'next/dynamic';

const NoticeResultsView = dynamic(() => import('./fetch'), {
  ssr: false, loading: () => (
    <div className='w-full p-8 flex flex-row justify-center items-center text-6xl'><Spinner2 /></div>
  )
    , }) 

export default function NoticePage() {
  return (
    <HStack gap="20px" style={{ margin: '40px' }}>
      <div className="my-10 text-4xl font-medium">공지사항</div>
      <div className="w-full border
      light:border-light-back-5
      dark:border-dark-back-5" />
      <NoticeResultsView />
    </HStack>
  );
}
