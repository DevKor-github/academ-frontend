import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import { SessionIdProvider } from '@/context/SessionIdContext';
import CommonLayout from '@/components/commonLayout/commonLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Academ',
  description: 'Academ - 수강 정보 공유',
};

import localFont from "next/font/local";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <SessionIdProvider>
        <ThemeProvider>
          <body className={`${inter.className} ${pretendard.className}`}>
            <CommonLayout>{children}</CommonLayout>
          </body>
        </ThemeProvider>
      </SessionIdProvider>
    </html>
  );
}
