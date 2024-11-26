'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

import dynamic from 'next/dynamic';
const AuthTokensProvider = dynamic(() => import('@/lib/context/AuthTokensContext'), { ssr: false });
import ClearStorageDependOnTabs from '@/lib/context/ClearStorageDependOnTabs';
import { KEY_FOR_ACCESS_TOKEN } from '@/lib/directive';
interface Props {
  children: ReactNode;
}

export default function Provider ({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClearStorageDependOnTabs keys={[KEY_FOR_ACCESS_TOKEN]}>
          <AuthTokensProvider>
    <QueryClientProvider client={queryClient}>
      {children}
        </QueryClientProvider>
      </AuthTokensProvider>
      </ClearStorageDependOnTabs>
  );
};