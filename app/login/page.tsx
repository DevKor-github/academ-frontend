import { HStack } from '@/components/basic/stack';

import dynamic from 'next/dynamic';
import LoginPageLoading from './aux';

const LoginForm = dynamic(() => import('./client'), { ssr: false, loading: LoginPageLoading });

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
        <LoginForm />
      </HStack>
    </span>
  );
}
