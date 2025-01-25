import { ReactNode, Suspense } from 'react';

interface Props {
  top: ReactNode;
  bot: ReactNode;
}

export default function Layout({ top, bot }: Props) {
  return (
    <Suspense>
      <div className="flex flex-col h-full">
        {top}
        {bot}
      </div>
    </Suspense>
  );
}
