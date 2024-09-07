import MyPageEditBasicForm from './inner/form';

export default function EditPage() {
  return (
    <MyPageEditBasicForm
      input={{ username: '', student_id: '', degree: 'MASTER', semester: 0, department: '' }}
      submitting={false}
    />
  );
}
