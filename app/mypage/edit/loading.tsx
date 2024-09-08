import MyPageEditBasicForm from './form';

export default function EditPage() {
  return (
    <MyPageEditBasicForm
      input={{ username: '', student_id: '', degree: 'MASTER', semester: 0, department: '' }}
      submitting={false}
    />
  );
}
