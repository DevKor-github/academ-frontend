import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import TopLevelLayout from '@/components/composite/toplevellayout';

import type { Viewport } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Academ',
  description: 'Academ - 수강 정보 공유',
  verification: {
    google: '_Z2qinMVs8kSNnx1bGzYvWePuA7VymxnuQG8Rhe2M2E',
    other: {
      'naver-site-verification': 'dee9637347b73df323379604875290ad69eb2ee8',
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7c0b22' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

import localFont from 'next/font/local';

const pretendard = localFont({
  src: 'fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

import Provider from '@/components/Provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body
        className={`${inter.className} ${pretendard.className} light:bg-base-32 dark:bg-base-1
      light:text-base-0 dark:text-base-32`}
      >
        <Provider>
          <TopLevelLayout>{children}</TopLevelLayout>
        </Provider>
      </body>
    </html>
  );
}
