import { ReactNode } from 'react';

interface Props {
  top: ReactNode;
  bot: ReactNode;
}

export default function Layout({ top, bot }: Props) {
  return (
    <div className="flex flex-col h-full">
      {top}
      {bot}
    </div>
  );
}
