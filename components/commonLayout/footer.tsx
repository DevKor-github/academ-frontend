

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
  return <footer className="pl-4 pr-4 md:pl-8 md:pr-8 border-t border-t-neutral-400 dark:border-t-neutral-700 bg-neutral-100 dark:bg-neutral-800 pt-8 pb-8">
    <AdaptiveStack vGap="20px" hGap="24px">
        <LogoIconRich width={`${150 * 0.6}px`} height={`${39 * 0.6}px`} />
        <span style={{ height: 'fit-content' }}>
          <Link href="/policy">
            이용약관
          </Link>
        </span>
        <span style={{ height: 'fit-content' }}>
          <Link href="/policy">
            버그리포트
          </Link>
      </span>
      <span className="md:ml-auto">Copyright ⓒ 2024 Academ. all rights reserved</span>
    </AdaptiveStack>
  </footer>;
}