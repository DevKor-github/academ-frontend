import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import { VStack, HStack } from '../base/Stack';
import { LogoIcon, DownIcon, UpIcon } from '../../icons';
import { useSessionId } from '../../contexts/SessionIdContext';

import styles from './index.module.css';
import { TopnavBlankButton, TopnavButton } from './button';

function TopNavInnerLeft() {
  return (
    <TopnavButton className={styles.nostroke} icon={<LogoIcon />} href="/">
      Academ
    </TopnavButton>
  );
}

const TopNavInnerMid = () => {
  const location = useLocation();
  const getLoc = (loc: { pathname: string }) => loc.pathname.split('/')[1];

  return (
    <VStack
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '72px',
      }}
    >
      <VStack gap="10px">
        <TopnavButton selected={getLoc(location) === 'notice'} href="/notice" children="공지사항" />
        <TopnavButton selected={getLoc(location) === 'timetable'} href="/timetable" children="시간표" />
        <TopnavButton selected={getLoc(location) === 'curation'} href="/curation" children="강의 추천" />
        <TopnavButton selected={getLoc(location) === 'mypage'} href="/mypage" children="마이페이지" />
        <TopnavButton selected={getLoc(location) === 'lecture'} href="/lecture" children="강의 목록" />
      </VStack>
    </VStack>
  );
};

function TopNavInnerRight() {
  const { sessionId } = useSessionId();

  return (
    <TopnavButton pill href={sessionId ? '/logout' : '/login'}>
      {sessionId ? '로그아웃' : '로그인'}
    </TopnavButton>
  );
}

function TopNavInner({
  overlap,
  spreadedState: { spreaded, setSpreaded },
}: {
  overlap?: boolean;
  spreadedState: { spreaded: boolean; setSpreaded: React.Dispatch<React.SetStateAction<boolean>> };
}) {
  // eslint-disable-next-line @typescript-eslint/no-shadow

  (function ignore(...args) {
    return args;
  })(spreaded, setSpreaded);

  return (
    <HStack
      className={`${styles.container} ${overlap ? styles.overlap : styles.line} ${
        spreaded ? styles.spreaded : styles.notSpreaded
      }`}
      style={{ overflow: 'hidden' }}
    >
      <VStack
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        <TopNavInnerLeft />
        <div className={styles.forSmall} style={{ height: '72px' }}>
          <TopnavBlankButton onClick={() => setSpreaded(!spreaded)}>
            {spreaded ? <UpIcon width="24px" height="24px" /> : <DownIcon width="24px" height="24px" />}
          </TopnavBlankButton>
        </div>
        <div className={styles.forBig} style={{ height: '72px' }}>
          <TopNavInnerMid />
        </div>
        <TopNavInnerRight />
      </VStack>
      <div className={styles.forSmall} style={{ width: '100%', height: '72px' }}>
        <TopNavInnerMid />
      </div>
    </HStack>
  );
}
export default function TopNav() {
  const location = useLocation();

  const overlap = location.pathname === '/';

  const [spreaded, setSpreaded] = useState(false);

  return overlap ? (
    <div
      style={{
        width: '100%',
        height: '500px',
        backgroundImage: 'url(/samplebanner.png)',
        position: 'relative',
        top: 0,
      }}
    >
      <div
        className={styles.gradient}
        style={{ width: '100%', height: '144px', position: 'absolute', top: 0, padding: '0px 40px' }}
      >
        <TopNavInner overlap={overlap} spreadedState={{ spreaded, setSpreaded }} />
      </div>
    </div>
  ) : (
    <div style={{ padding: '0px 40px' }}>
      <TopNavInner spreadedState={{ spreaded, setSpreaded }} />
    </div>
  );
}
