import Link from 'next/link';
import { LogoIconRich, UpIcon, DownIcon } from '@/component/icon';
import Skeleton from '@/component/composite/skeleton';
import Button from '@/component/basic/button';

export function TopNavInnerLeft() {
  return (
    <Link href="/" className="items-center justify-start flex p-2" style={{ height: '64px', width: '108px' }}>
      <LogoIconRich />
    </Link>
  );
}

function NavButton({
  label,
  desiredPath,
  currentPath,
  wip,
  onClick,
}: {
  label: string;
  desiredPath: string;
  currentPath: string;
  wip?: true;
  onClick: () => void;
}) {
  const accent: boolean = currentPath.startsWith(desiredPath); //currentPath === desiredPath || currentPath.startsWith(desiredPath + '/');
  return (
    <Link
      href={desiredPath}
      onClick={onClick}
      className={'whitespace-nowrap p-2 ' + (accent ? 'text-primary-500' : '')}
    >
      {wip ? (
        <span>
          {label}{' '}
          <sup
            className={`rounded-full border p-1
          ${accent ? 'border-primary-500 ' : '' /* overriding */}`}
          >
            준비 중
          </sup>
        </span>
      ) : (
        label
      )}
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
  setSpreaded: SetState<boolean>;
}) => {
  const nbsp = '\u00A0';

  const height = spreaded ? ' h-72 ' : ' h-16 ';

  return (
    <nav
      className={`${spreaded ? 'overflow-visible' : 'overflow-y-hidden'} ${height} md:h-16 items-center justify-start flex flex-col md:flex-row`}
      style={{ rowGap: '10px' }}
    >
      <div className="md:hidden">
        <Button kind="blank" style={{ minHeight: '64px' }} onClick={() => setSpreaded(!spreaded)}>
          {spreaded ? <UpIcon /> : <DownIcon />}
        </Button>
      </div>
      <NavButton
        currentPath={path}
        desiredPath="/lecture"
        label={`강의${nbsp}검색`}
        onClick={() => setSpreaded(false)}
      />
      <NavButton
        wip
        currentPath={path}
        desiredPath="/curation"
        label={`강의${nbsp}추천`}
        onClick={() => setSpreaded(false)}
      />
      <NavButton wip currentPath={path} desiredPath="/timetable" label={`시간표`} onClick={() => setSpreaded(false)} />
      <NavButton currentPath={path} desiredPath="/notice" label={`공지사항`} onClick={() => setSpreaded(false)} />
    </nav>
  );
};

export function TopNavRightLoading() {
  return (
    <Button className="rounded-full">
      <Skeleton
        className="rounded-full bg-primary-300"
        placeholder={<span className="whitespace-nowrap">로그인/회원가입</span>}
      />
    </Button>
  );
}
