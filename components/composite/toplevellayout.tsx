import TopNav from '../commonLayout/topnav';

import { IS_DEBUG } from '@/lib/directive';
import Link from 'next/link';
import { LogoIconRich } from '@/components/icon';

function Footer() {
  return (
    <footer className="flex not-md:flex-col gap-y-8 md:flex-row flex-wrap text-xs pl-4 pr-4 md:pl-8 md:pr-8 border-t light:border-base-28 dark:border-base-8 light:bg-base-30 dark:bg-base-4 pt-8 pb-8">
      <div className="flex flex-row gap-x-6">
        <Link className="" href="/about">
          <LogoIconRich />
        </Link>
        <Link href="/policy">이용약관</Link>
        <Link href={process.env.NEXT_PUBLIC_BUG_REPORT || ''}>버그리포트</Link>
        {IS_DEBUG && <Link href="/diagnostic">진단</Link>}
      </div>
      <span className="md:ml-auto">Copyright ⓒ 2024 Academ. all rights reserved</span>
    </footer>
  );
}

export default function CommonLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <div className="flex flex-col min-h-svh">
      <TopNav />
      <main className="flex flex-col flex-grow w-full min-h-vh">{children}</main>
      <Footer />
    </div>
  );
}
