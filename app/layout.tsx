import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { SessionIdProvider } from '@/context/SessionIdContext';
import TopLevelLayout from '@/components/composite/toplevellayout';

import type { Viewport } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Academ',
  description: 'Academ - 수강 정보 공유',
  verification: {
    google: '_Z2qinMVs8kSNnx1bGzYvWePuA7VymxnuQG8Rhe2M2E',
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
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <head>
        <meta name="naver-site-verification" content="dee9637347b73df323379604875290ad69eb2ee8" />
      </head>
      <body className={`${inter.className} ${pretendard.className}`}>
        <SessionIdProvider>
          <TopLevelLayout>
            {children}
          </TopLevelLayout>
        </SessionIdProvider>
      </body>
    </html>
  );
}
