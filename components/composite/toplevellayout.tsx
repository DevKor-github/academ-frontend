import TopNav from '../commonLayout/topnav';

import { isDebug } from '@/lib/directive';
import Link from 'next/link';
import { LogoIconRich } from '@/icons';

function Footer() {
  return (
    <footer className="flex not-md:flex-col gap-y-8 md:flex-row flex-wrap text-xs pl-4 pr-4 md:pl-8 md:pr-8 border-t light:border-light-back-4 dark:border-dark-back-8 light:bg-light-back-1 dark:bg-dark-back-4 pt-8 pb-8">
      <div className="flex flex-row gap-x-6">
        <Link className="" href="/about">
          <LogoIconRich />
        </Link>
        <Link href="/policy">이용약관</Link>
        <Link href={process.env.NEXT_PUBLIC_BUG_REPORT || ''}>버그리포트</Link>
        {isDebug && <Link href="/diagnostic">진단</Link>}
      </div>
      <span className="md:ml-auto">Copyright ⓒ 2024 Academ. all rights reserved</span>
    </footer>
  );
}

export default function CommonLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <div className='flex flex-col' style={{ minHeight: '100vh' }}>
      <TopNav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
