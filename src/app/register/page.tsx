'use client';

import { useCallback, useState } from 'react';

import { HStack } from '@/components/basic/stack';

import Step0 from './steps/step0';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';
import { useForm } from '@tanstack/react-form';
import type { SignupRequestForm } from './types/form.types';

export default function RegisterPage() {
  const [rate, setRate] = useState(0);
  const form = useForm<SignupRequestForm>({
    defaultValues: {
      email: '',
      password: '',
      passwordCheck: '',
      username: '',
      student_id: '',
      degree: 'MASTER',
      semester: 0,
      department: '',
      code: '',
    },
    onSubmit: async () => {
      // we don't use onSubmit for now, check handleNextStep in each steps
    },
  });

  const nextStep = useCallback(() => {
    setRate((r) => r + 1);
  }, [setRate]);

  const pages = [
    <Step0 key={0} nextStep={nextStep} />,
    <Step1 key={1} nextStep={nextStep} form={form} />,
    <Step2 key={2} nextStep={nextStep} form={form} />,
    <Step3 key={3} nextStep={nextStep} form={form} />,
    <Step4 key={4} />,
  ];

  return (
    <div className="flex w-full h-full justify-center items-center">
      <HStack className="gap-y-8" style={{ width: 'max(500px, 50vw)', margin: '40px 30px' }}>
        {pages[rate]}
      </HStack>
    </div>
  );
}
