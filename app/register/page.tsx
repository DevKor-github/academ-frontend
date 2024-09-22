'use client';

import { useState } from 'react';

import { HStack } from '@/component/basic/stack';

import Step0 from './steps/step0';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';

export default function RegisterPage() {
  const [rate, setRate] = useState(0);
  const [input, setInput] = useState<SignupRequest>({
    email: '',
    password: '',
    username: '',
    student_id: '',
    degree: 'MASTER',
    semester: 0,
    department: '',
    code: '',
  });

  const pages = [
    <Step0 key={0} nextStep={() => setRate(rate + 1)} />,
    <Step1 key={1} nextStep={() => setRate(rate + 1)} input={input} setInput={setInput} />,
    <Step2 key={2} nextStep={() => setRate(rate + 1)} input={input} setInput={setInput} />,
    <Step3 key={3} nextStep={() => setRate(rate + 1)} input={input} setInput={setInput} />,
    <Step4 key={4} />,
  ];

  return (
    <div className="flex w-full h-full justify-center items-center">
      <HStack gap="40px" style={{ width: 'max(500px, 50vw)', margin: '40px 30px' }}>
        {pages[rate]}
      </HStack>
    </div>
  );
}
