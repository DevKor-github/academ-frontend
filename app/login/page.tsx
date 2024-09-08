import { HStack } from '@/components/basic/stack';

import dynamic from 'next/dynamic';

import LoginForm from './form';

const LoginClientForm = dynamic(() => import('./client'), {
  ssr: false,
  loading: () => (
    <LoginForm
      input={{ email: '', password: '', 'remember-me': false }}
      submitting={false}
      shake={false}
      loginError=""
    />
  ),
});

export default function LoginPage() {
  return (
    <span
      className="text-xl"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        height: '100%',
        width: '100%',
      }}
    >
      <HStack className="text-lg" gap="48px" style={{ width: '400px' }}>
        <span className="text-4xl" style={{ textAlign: 'center' }}>
          로그인
        </span>
        <LoginClientForm />
      </HStack>
    </span>
  );
}
