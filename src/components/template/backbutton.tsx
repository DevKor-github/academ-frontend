'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/basic/button';

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return <Button onClick={goBack}>뒤로가기</Button>;
};

export default BackButton;
