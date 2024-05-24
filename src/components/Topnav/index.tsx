import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import Typography from '../base/Typography';
import { VStack, HStack } from '../base/Stack';
import Popover from '../base/Popover';
import Carousel, { CarouselItem } from '../base/Carousel';
import { LogoIconRich, DownIcon, UpIcon, BookIcon } from '../../icons';
import GlobalStyle from '../../Global.module.css';
import { useSessionId } from '../../contexts/SessionIdContext';

import popoverStyles from './popover.module.css';
import styles from './index.module.css';
import { TopnavBlankButton, TopnavButton } from './button';

function TopNavInnerLeft({ overlap }: { overlap?: boolean }) {
  return (
    <TopnavButton
      className={styles.nostroke}
      icon={<LogoIconRich overlap={overlap} width={`${150 * 0.6}px`} height={`${39 * 0.6}px`} />}
      href="/"
      children=""
    />
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
      </VStack>
    </VStack>
  );
};
function TopNavInnerRight() {
  const { sessionId } = useSessionId();

  const [openPopover, setOpenPopover] = useState<boolean>(false);
  return sessionId ? (
    <div>
      <TopnavButton pill onClick={() => setOpenPopover(!openPopover)}>
        <span className={styles.forSmall} style={{ textWrap: 'nowrap', overflow: 'hidden' }}>
          프사
        </span>
        <span className={styles.forBig} style={{ textWrap: 'nowrap', overflow: 'hidden' }}>
          {sessionId}님
        </span>
      </TopnavButton>
      {openPopover && (
        <Popover onClose={() => setOpenPopover(false)} className={popoverStyles.popover}>
          <HStack style={{ backgroundColor: 'var(--back-0)', borderRadius: '12px' }}>
            <TopnavButton href="/mypage">마이페이지</TopnavButton>
            <TopnavButton href="/logout">로그아웃</TopnavButton>
            <TopnavButton onClick={() => setOpenPopover(false)}>닫기</TopnavButton>
          </HStack>
        </Popover>
      )}
    </div>
  ) : (
    <TopnavButton pill href="/login">
      로그인
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
        <TopNavInnerLeft overlap={overlap} />
        <div className={styles.forSmall} style={{ height: '72px' }}>
          <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)' }}>
            <TopnavBlankButton onClick={() => setSpreaded(!spreaded)}>
              {spreaded ? <UpIcon width="24px" height="24px" /> : <DownIcon width="24px" height="24px" />}
            </TopnavBlankButton>
          </div>
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
        height: overlap ? 'var(--adaptive-h)' : spreaded ? '144px' : '72px',
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
            // eslint-disable-next-linmin(480px, 100vw)e no-nested-ternary
            height: '',
            position: 'absolute',
            background: 'grey',
            top: 0,
            transition: 'all .3s ease',
          }}
          children={[
            <CarouselItem key={'/banner/image1.png'} url="/banner/image1.png">
              <HStack style={{ width: '100%', height: '100%', justifyContent: 'end', color: 'white' }} gap="24px">
                <VStack style={{ alignItems: 'center' }} gap="12px">
                  <Typography bold variant="t1">
                    ACADEM
                  </Typography>
                  <Typography variant="t5" style={{ borderLeft: '1px solid #aaaaaa', paddingLeft: '12px' }}>
                    아카뎀
                  </Typography>
                </VStack>
                <VStack gap="24px" style={{ alignItems: 'center' }}>
                  <Typography variant="t4" lineHeight={1.5}>
                    대학원생을 위한{' '}
                    <Typography bold variant="t4">
                      강의평가 공유 서비스
                    </Typography>
                    <br />
                    우리 학교 강의에 대한 다양한 정보와 이야기를 나누어요.
                  </Typography>
                  <TopnavButton pill href="/about">
                    자세히보기
                  </TopnavButton>
                </VStack>
              </HStack>
            </CarouselItem>,
            <CarouselItem key={'/banner/image2.png'} url="/banner/image2.png">
              <HStack gap="24px" style={{ alignItems: 'center', color: 'white' }}>
                <Typography variant="t4">
                  <Typography bold variant="t4">
                    이론 중심
                  </Typography>
                  {' 강의? '}
                  <Typography bold variant="t4">
                    실험 중심
                  </Typography>
                  {' 강의? '}
                </Typography>
                <Typography variant="t1">어떤 강의가 나의 연구에 도움이 될까?</Typography>
                <VStack gap="12px">
                  <BookIcon width="24px" height="24px" auto={false} color="white" />
                  <Typography variant="t5">강의 간의 비교를 통해 나의 학업에 도움이 되는 강의를 선택하세요.</Typography>
                </VStack>
              </HStack>
            </CarouselItem>,
            <CarouselItem key={'/banner/image3.png'} url="/banner/image3.png">
              <HStack gap="24px" style={{ width: '100%', color: 'white' }}>
                <Typography variant="t1">
                  <Typography bold variant="t1">
                    문제 출제 유형
                  </Typography>
                  과{' '}
                  <Typography bold variant="t1">
                    기출
                  </Typography>
                  을 한눈에
                </Typography>
                <VStack gap="12px">
                  <BookIcon width="24px" height="24px" auto={false} color="white" />
                  <Typography variant="t5">
                    수업 및 시험 방식에 대한 정보를 얻고{' '}
                    <Typography bold variant="t5">
                      효율적으로 시험을 준비
                    </Typography>
                    할 수 있어요.
                  </Typography>
                </VStack>
              </HStack>
            </CarouselItem>,
          ]}
        />
      )}
      <div
        className={`${GlobalStyle.metacontainer}`}
        style={{
          width: '100%',
          height: overlap || spreaded ? '144px' : '72px',
          position: 'absolute',
          top: 0,
        }}
      >
        <TopNavInner overlap={overlap} spreadedState={{ spreaded, setSpreaded }} />
      </div>
    </div>
  );
}
