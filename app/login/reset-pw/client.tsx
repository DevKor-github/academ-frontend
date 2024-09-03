'use client';


import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { apiResetPassword } from '@/lib/api/login';
import { apiSendEmail } from '@/lib/api/login';
import { handleInputBuilder } from '@/lib/form/handler';
import ResetPwForm1 from './inner/form1';
import ResetPwForm2 from './inner/form2';

export default function FindPWPageClient() {
  const [input, setInput] = useState<ResetPwReq>({
    email: '', code: ''
  });

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const route = useRouter();


  
  const handleInput = handleInputBuilder(input, setInput);

  function handleSendcode() {

  }

  function handleReset() {
    //input.email // input.password
    setWip(true);
    apiResetPassword({ email: (input.email.split('@')[0] || ''), code: (input.code) }).then((s) => {
      if (s.status === 'SUCCESS') {
        alert(s.message);
        route.push('/login');
      } else {
        alert(s.message);
        setWip(false);
      }
    });
  }



  return (step === 1 ?
    <ResetPwForm1 input={input} handleInput={handleInput} handleSubmit={handleSendcode}  /> :
    <ResetPwForm2 input={input} handleInput={handleInput} handleSubmit={handleSendcode}  />);
}
