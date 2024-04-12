import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';

import VStack from '../VStack';
import Typography from '../Typography';
import Spacer from '../Spacer';
import AdaptiveStack from '../AdaptiveStack';
import { useSessionId } from '../../contexts/SessionIdContext';

import styles from './index.module.css';
import buttonStyles from './button.module.css';

interface TopnavBlankButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  icon?: string;
  pill?: boolean;
  selected?: boolean;
  [key: string]: unknown;
}

interface TopnavButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: string;
  pill?: boolean;
  selected?: boolean;
  [key: string]: unknown;
}
function TopnavBlankButton({ selected, children, icon, pill, onClick, className }: TopnavBlankButtonProps) {
  return (
    <span className={className}>
      <button
        // tabIndex={0}
        className={`${buttonStyles.shared} ${pill ? buttonStyles.pill : buttonStyles.primary} ${
          selected ? buttonStyles.selected : buttonStyles.unselected
        }`}
        onClick={onClick}
      >
        {icon && <img src={icon} style={{ aspectRatio: 1, height: '18pt', width: 'auto', marginRight: '5px' }} />}
        <Typography variant="t4">{children}</Typography>
      </button>
    </span>
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
        <Typography variant="t4">{children}</Typography>
      </span>
    </a>
  );
}
export default function TopNav() {
  const { sessionId } = useSessionId();
  const location = useLocation();

  const [spreaded, setSpreaded] = useState(false);

  const getLoc = (loc: { pathname: string }) => loc.pathname.split('/')[1];

  const overlap = location.pathname === '/';

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const Topbar = ({ overlap }: { overlap?: boolean }) => (
    <Box
      className={`${styles.pad}`}
      sx={{
        width: '100%',
        position: overlap ? 'absoulte' : 'relative',
        top: 0,
      }}
    >
      <AdaptiveStack
        className={`${overlap ? styles.overlap : styles.line} ${styles.strategy}`}
        style={{
          display: 'flex',
          height: spreaded ? 'fit-content' : '72px',
          width: '100%',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
        }}
      >
        <VStack className={styles.logoStrategy} style={{ height: '72px' }}>
          <TopnavButton icon="./logo512.png" href="/">
            Academ
          </TopnavButton>
          <TopnavBlankButton className={styles.small} onClick={() => setSpreaded(!spreaded)}>
            {spreaded ? '접기' : '메뉴'}
          </TopnavBlankButton>
          <TopnavButton pill href={sessionId ? '/logout' : '/login'} className={styles.small}>
            {sessionId ? '로그아웃' : '로그인'}
          </TopnavButton>
        </VStack>

        <AdaptiveStack vGap="10px" hGap="4px" className={styles.strategy}>
          <TopnavButton selected={getLoc(location) === 'notice'} href="/notice">
            공지사항
          </TopnavButton>
          <TopnavButton selected={getLoc(location) === 'timetable'} href="/timetable">
            시간표
          </TopnavButton>
          <TopnavButton selected={getLoc(location) === 'curation'} href="/curation">
            강의 추천
          </TopnavButton>
          <TopnavButton selected={getLoc(location) === 'mypage'} href="/mypage">
            마이페이지
          </TopnavButton>
          <TopnavButton selected={getLoc(location) === 'lecture'} href="/lecture">
            강의 목록
          </TopnavButton>
          <Spacer />
        </AdaptiveStack>

        <AdaptiveStack>
          <TopnavButton pill href={sessionId ? '/logout' : '/login'} className={styles.big}>
            {sessionId ? '로그아웃' : '로그인'}
          </TopnavButton>
        </AdaptiveStack>
      </AdaptiveStack>
    </Box>
  );

  return overlap ? (
    <Box
      width={'100%'}
      height={'500px'}
      sx={{ backgroundImage: 'url(/samplebanner.png)', position: 'relative', top: 0 }}
    >
      <Box
        className={overlap ? styles.gradient : ''}
        width={'100%'}
        height={spreaded ? '500px' : '144px'}
        top={0}
        sx={{ position: 'absolute', top: 0 }}
      >
        <Topbar overlap={overlap} />
      </Box>
    </Box>
  ) : (
    <Topbar />
  );
}
