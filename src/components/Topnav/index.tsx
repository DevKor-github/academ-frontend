import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

import VStack from '../VStack';
import TopnavButton from '../TopnavButton';
import Spacer from '../Spacer';
import { useSessionId } from '../../contexts/SessionIdContext';

import styles from './index.module.css';

interface TopNavProps {
  overlap?: boolean;
}

export default function TopNav({ overlap }: TopNavProps) {
  const { sessionId } = useSessionId();
  const location = useLocation();

  const getLoc = (loc: { pathname: string }) => loc.pathname.split('/')[1];

  return (
    <Box
      className={`${overlap ? styles.gradient : ''}`}
      sx={{
        width: '100%',
        height: '72px',
        zIndex: overlap ? 100 : 0,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        className={`${overlap ? '' : styles.line} ${styles.bar}`}
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          alignItems: 'center',
          color: overlap ? 'white' : 'black',
        }}
      >
        <VStack>
          <TopnavButton icon="./logo512.png" href="/">
            Academ
          </TopnavButton>
        </VStack>
        <Spacer x={20} />
        <VStack gap="10px">
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
        </VStack>
        <Spacer x={20} />
        <VStack>
          {sessionId ? (
            <TopnavButton pill href="/logout">
              로그아웃
            </TopnavButton>
          ) : (
            <TopnavButton pill href="/login">
              로그인/회원가입
            </TopnavButton>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
