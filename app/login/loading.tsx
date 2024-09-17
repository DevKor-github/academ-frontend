import LoginForm from './form';

export default function LoginPage() {
  return (
    <LoginForm
      input={{ email: '', password: '', 'remember-me': false }}
      submitting={false}
      shake={false}
      loginError=""
    />
  );
}
