import MyPageEditBasicForm from './inner/form';

import dynamic from 'next/dynamic';

const MyPageEditBasic = dynamic(() => import('./client'), {
  ssr: false, loading: 
  () => (<MyPageEditBasicForm input={{ username : '', student_id : '', degree: 'MASTER', semester: 0, department: '' }} submitting={false} />)
 });

export default function EditPage() {
  return <MyPageEditBasic />;
}
