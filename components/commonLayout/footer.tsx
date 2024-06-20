

interface AdaptiveStackProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  vGap?: string | number;
  hGap?: string | number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

 function AdaptiveStack({ className = "", vGap, hGap, children, style }: AdaptiveStackProps) {
  const combinedStyle  : React.CSSProperties = { ...style, ...{ columnGap: vGap, rowGap: hGap } };

  return (
    <div className={"flex flex-col md:flex-row " + className} style={combinedStyle}>
      {children}
    </div>
  );
}

import Link from "next/link";
import { LogoIconRich } from "@/icons";

export default function Footer() {
  return <footer className=" text-xs pl-4 pr-4 md:pl-8 md:pr-8 border-t light:border-light-back-4 dark:border-dark-back-8 light:bg-light-back-1 dark:bg-dark-back-4 pt-8 pb-8">
    <AdaptiveStack vGap="20px" hGap="24px">
        <Link className="" href="/about">
          <LogoIconRich />
        </Link>
          <Link href="/policy">
            이용약관
          </Link>
          <Link href={process.env.NEXT_PUBLIC_BUG_REPORT || ''}>
            버그리포트
      </Link>{
        (process.env.NODE_ENV === "development") &&
      <Link href="/diagnostic">
            진단
      </Link>}
      <span className="md:ml-auto">Copyright ⓒ 2024 Academ. all rights reserved</span>
    </AdaptiveStack>
  </footer>;
}