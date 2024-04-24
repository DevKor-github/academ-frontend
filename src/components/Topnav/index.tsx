import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';

import Typography from '../base/Typography';
import { VStack } from '../base/Stack';
import AdaptiveStack from '../base/AdaptiveStack';
import { useSessionId } from '../../contexts/SessionIdContext';

import styles from './index.module.css';
import buttonStyles from './button.module.css';

interface TopnavBlankButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  pill?: boolean;
  selected?: boolean;
  [key: string]: unknown;
}

interface TopnavButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: string;
  pill?: boolean;
  [key: string]: unknown;
}
function TopnavBlankButton({ selected, children, pill, onClick, className, ...restProps }: TopnavBlankButtonProps) {
  return (
    <a className={`${className}`}>
      <span
        // tabIndex={0}
        className={`${buttonStyles.primary} ${buttonStyles.unselected} ${buttonStyles.shared}`}
        onClick={onClick}
        {...restProps}
      >
        <Typography variant="t5">{children}</Typography>
      </span>
    </a>
  );
}

function TopnavButton({ selected, href, children, icon, pill, ...restProps }: TopnavButtonProps) {
  const navigate = useNavigate();

  return (
    <a
      href={href}
      onClick={(e) => {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          navigate(href);
        }
      }}
      {...restProps}
    >
      <span
        // tabIndex={0}
        className={`${buttonStyles.shared} ${pill ? buttonStyles.pill : buttonStyles.primary} ${
          selected ? buttonStyles.selected : buttonStyles.unselected
        }`}
      >
        {icon && <img src={icon} style={{ aspectRatio: 1, height: '18pt', width: 'auto', marginRight: '5px' }} />}
        <Typography variant="t5">{children}</Typography>
      </span>
    </a>
  );
}

function TopNavInner({
  overlap,
  spreadedState: { spreaded, setSpreaded },
}: {
  overlap?: boolean;
  spreadedState: { spreaded: boolean; setSpreaded: React.Dispatch<React.SetStateAction<boolean>> };
}) {
  const { sessionId } = useSessionId();
  const location = useLocation();
  const getLoc = (loc: { pathname: string }) => loc.pathname.split('/')[1];

  // eslint-disable-next-line @typescript-eslint/no-shadow
  return (
    <div
      className={`${styles.container} ${overlap ? styles.overlap : styles.line}`}
      style={{
        display: 'flex',
        height: 'auto',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <VStack className={`${styles.item}`}>
        <TopnavButton icon="/logo512.png" href="/">
          Academ
        </TopnavButton>
      </VStack>

      <AdaptiveStack
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          height: spreaded ? '160px' : '72px',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
        }}
      >
        <TopnavBlankButton className={`${styles.menu}`} onClick={() => setSpreaded(!spreaded)}>
          {spreaded ? '접기' : '메뉴'}
        </TopnavBlankButton>

        <VStack className={styles.menulist} gap="10px">
          <TopnavButton className={`${styles.compact}`} selected={getLoc(location) === 'notice'} href="/notice">
            공지사항
          </TopnavButton>
          <TopnavButton className={`${styles.compact}`} selected={getLoc(location) === 'timetable'} href="/timetable">
            시간표
          </TopnavButton>
          <TopnavButton className={`${styles.compact}`} selected={getLoc(location) === 'curation'} href="/curation">
            강의 추천
          </TopnavButton>
          <TopnavButton className={`${styles.compact}`} selected={getLoc(location) === 'mypage'} href="/mypage">
            마이페이지
          </TopnavButton>
          <TopnavButton className={`${styles.compact}`} selected={getLoc(location) === 'lecture'} href="/lecture">
            강의 목록
          </TopnavButton>
        </VStack>
      </AdaptiveStack>

      <AdaptiveStack className={`${styles.item}`}>
        <TopnavButton pill href={sessionId ? '/logout' : '/login'}>
          {sessionId ? '로그아웃' : '로그인'}
        </TopnavButton>
      </AdaptiveStack>
    </div>
  );
}
export default function TopNav() {
  const location = useLocation();

  const overlap = location.pathname === '/';

  const [spreaded, setSpreaded] = useState(false);

  return overlap ? (
    <Box
      width={'100%'}
      height={'500px'}
      sx={{ backgroundImage: 'url(/samplebanner.png)', position: 'relative', top: 0 }}
    >
      <Box className={styles.gradient} width={'100%'} height={'144px'} top={0} sx={{ position: 'absolute', top: 0 }}>
        <TopNavInner overlap={overlap} spreadedState={{ spreaded, setSpreaded }} />
      </Box>
    </Box>
  ) : (
    <TopNavInner spreadedState={{ spreaded, setSpreaded }} />
  );
}
