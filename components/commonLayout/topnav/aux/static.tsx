import Link from "next/link";
import { LogoIconRich, UpIcon, DownIcon } from "@/icons";
import Skeleton from "@/components/composite/skeleton";
import Button from "@/components/basic/button";

export function TopNavInnerLeft() {
  return (
    <Link
      href="/"
      className="items-center justify-start flex p-2"
      style={{ height: '64px', width: '108px' }}
    >
        <LogoIconRich />
    </Link>
  );
}

function NavButton({ label, desiredPath, currentPath, wip }: {
  label: string;
  desiredPath: string;
  currentPath: string;
  wip?: true;
}) {
  return (
    <Link href={desiredPath} className={' p-2 ' + (currentPath === desiredPath ? 'text-primary-500' : '')}>
      {wip ? (
        <span>{label} <sup className="rounded-full border border-light-back-2 dark:border-dark-back-4 p-1">준비 중</sup></span>
      ) : label}
    </Link>
  );
}

export const TopNavInnerMid = ({
  path,
  spreaded,
  setSpreaded,
}: {
  path: string;
  spreaded: boolean;
    setSpreaded: (b: boolean) => void;
}) => {
  const nbsp = '\u00A0';

  const height = spreaded ? ' h-72 ' : ' h-16 ';

  return (
    <div
      className={`overflow-y-hidden transition-all ${height} md:h-16 items-center justify-start flex flex-col md:flex-row`}
      style={{ rowGap: '10px' }}
    >
      <div className="md:hidden">
        <Button kind="blank" style={{ minHeight: '64px' }} onClick={() => setSpreaded(!spreaded)}>
          {spreaded ? <UpIcon /> : <DownIcon />}
        </Button>
      </div>
      <NavButton currentPath={path} desiredPath="/lecture" label={`강의${nbsp}검색`} />
      <NavButton wip currentPath={path} desiredPath="/curation" label={`강의${nbsp}추천`} />
      <NavButton wip currentPath={path} desiredPath="/timetable" label={`시간표`} />
      <NavButton currentPath={path} desiredPath="/notice" label={`공지사항`} />
    </div>
  );
};

export function TopNavRightLoading() {
  return (
    <Button>
      <Skeleton placeholder="로그인/회원가입" />
    </Button>
  );
}