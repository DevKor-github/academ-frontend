import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import { VStack, HStack } from '../base/Stack';
import Carousel from '../base/Carousel';
import { LogoIcon, DownIcon, UpIcon } from '../../icons';
import GlobalStyle from '../../Global.module.css';
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

  const nbsp = '\u00A0';

  return (
    <VStack
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '72px',
      }}
    >
      <VStack gap="10px">
        <TopnavButton selected={getLoc(location) === 'lecture'} href="/lecture" children={`강의${nbsp}목록`} />
        <TopnavButton selected={getLoc(location) === 'curation'} href="/curation" children={`강의${nbsp}추천`} />
        <TopnavButton selected={getLoc(location) === 'timetable'} href="/timetable" children="시간표" />
        <TopnavButton selected={getLoc(location) === 'notice'} href="/notice" children="공지사항" />
        <TopnavButton selected={getLoc(location) === 'mypage'} href="/mypage" children="마이페이지" />
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
      <div
        className={styles.forSmall}
        style={{ width: '100%', height: '72px', overflowX: 'scroll', overflowY: 'hidden' }}
      >
        <TopNavInnerMid />
      </div>
    </HStack>
  );
}
export default function TopNav() {
  const location = useLocation();

  const overlap = location.pathname === '/';

  const [spreaded, setSpreaded] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        // eslint-disable-next-line no-nested-ternary
        height: overlap ? '480px' : spreaded ? '144px' : '72px',
        // background: 'grey',
        position: 'relative',
        top: 0,
        transition: 'all .3s ease',
      }}
    >
      {overlap && (
        <Carousel
          style={{
            width: '100%',
            // eslint-disable-next-line no-nested-ternary
            height: overlap ? '480px' : '72px',
            position: 'absolute',
            top: 0,
            transition: 'all .3s ease',
          }}
          children={[
            <img src={'/samplebanner.png'} />,
            <img src={'/samplebanner.png'} />,
            <img src={'/samplebanner.png'} />,
            <img src={'/samplebanner.png'} />,
          ]}
        />
      )}
      <div
        className={`${overlap ? styles.gradient : ''} ${GlobalStyle.metacontainer}`}
        style={{ width: '100%', height: overlap || spreaded ? '144px' : '72px', position: 'absolute', top: 0 }}
      >
        <TopNavInner overlap={overlap} spreadedState={{ spreaded, setSpreaded }} />
      </div>
    </div>
  );
}
