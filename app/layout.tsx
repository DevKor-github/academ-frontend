import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionIdProvider } from "@/context/SessionIdContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Academ",
  description: "Academ - 수강 정보 공유",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <SessionIdProvider>
        <ThemeProvider>
          <body className={inter.className}>
            {children}
          </body>
        </ThemeProvider>
      </SessionIdProvider>
    </html>
  );
}
