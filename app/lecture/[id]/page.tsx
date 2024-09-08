import dynamic from 'next/dynamic';
import { CourseBasicsViewLoading } from './components/CourseBasicsView';

const LectureFetch = dynamic(() => import('./fetch'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col w-full h-full">
      <CourseBasicsViewLoading />
    </div>
  ),
});

export default function LecturePage({ params: { id } }: { params: { id: number } }) {
  return <LectureFetch id={id} />;
}
