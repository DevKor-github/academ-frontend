import { HStack } from '@/components/basic/stack';

import dynamic from 'next/dynamic';

import ResetPwForm1 from './inner/form1';

const FindPWForm = dynamic(() => import('./client'), {
  ssr: false, loading: () => (<ResetPwForm1 input={{email : '', code: ''}} submitting={false} />)
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
        <span style={{ textAlign: 'center' }}>
          <span className="text-4xl" >
            비밀번호 초기화<br />
          </span>
          <span>
            비밀번호를 잊은 경우 이메일을 입력하여 임시 비밀번호를 발급받을 수 있습니다.
          </span>
        </span>

        <FindPWForm />
      </HStack>
    </span>
  );
}
