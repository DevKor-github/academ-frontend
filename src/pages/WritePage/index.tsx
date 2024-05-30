import { useParams } from 'react-router-dom';

import { StarIcon } from '../../icons';
import GlobalStyles from '../../Global.module.css';
import { HStack, VStack, Tag, Typography, Progress } from '../../components';

import styles from './common.module.css';

const BasicInfoView: React.FC<Record<string, never>> = () => {
  return (
    <VStack
      className={`${GlobalStyles.metacontainerMargin} ${styles.borderBottom}`}
      style={{
        paddingTop: '160px',
        paddingBottom: '60px',
        justifyItems: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
      gap="24px"
    >
      <div
        style={{
          height: '80px',
          width: '80px',
          aspectRatio: 1,
          borderRadius: '52px',
          background: '#d9d9d9',
        }}
      />
      <HStack gap="10px">
        <VStack gap="10px" style={{ alignItems: 'end', flexWrap: 'wrap' }}>
          <Typography variant="t3" children="기초 정보 디자인" />
          <Tag children="강의평 8개" />
        </VStack>
        <VStack gap="20px" style={{ flexWrap: 'wrap' }}>
          <Typography variant="t6" children="송운비 교수님" />
          <Typography variant="t6" children="UNBE22512(01)" />
          <Typography variant="t6" children="2024년 1학기" />
          <Typography variant="t6" children="목 (7-8), 미디어관 901호" />
        </VStack>
      </HStack>
    </VStack>
  );
};

const SummrayViewSingleCriteria: React.FC<{ criteriaName: string }> = ({ criteriaName }) => (
  <HStack gap="10px">
    <Typography variant="t5" children={criteriaName} />
    <HStack gap="10px">
      <VStack style={{ justifyContent: 'space-between' }}>
        <Tag children="나쁨" />
        <Tag children="좋음" />
      </VStack>
      <Progress rate={Math.random()} style={{ padding: '0px 10px 0px 10px' }} />
    </HStack>
  </HStack>
);

function SummaryView() {
  const tags = ['친절한', '뿌듯한', '과제량이 많은', '뿌듯한', '과제량이 많은'];

  return (
    <HStack gap="30px" className={`${GlobalStyles.metacontainer}`} style={{ marginTop: '160px' }}>
      <Typography variant="t3" children="평가 한눈에보기" />

      <VStack
        gap="20px"
        style={{ justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'start', margin: '20px 0px' }}
      >
        <HStack style={{ border: '1px solid #b7b7b7', borderRadius: '20px', padding: '80px 40px', width: '320px' }}>
          <VStack gap="10px" style={{ borderBottom: '1px solid black', alignItems: 'end' }}>
            <Typography variant="t1">4.0</Typography>
            <Typography variant="t3">/5</Typography>
            <Typography variant="t3">(57)</Typography>
            {'별 다섯개'}
          </VStack>
          <VStack style={{ flexWrap: 'wrap', margin: '20px 0px 0px 0px', justifyContent: 'start' }}>
            {tags.map((t) => (
              <Tag style={{ margin: '6px 6px 0px 0px' }} children={t} />
            ))}
          </VStack>
        </HStack>
        <HStack gap="10px" style={{ width: '320px', margin: '20px 0px' }}>
          <SummrayViewSingleCriteria criteriaName="학습량" />
          <SummrayViewSingleCriteria criteriaName="성적" />
          <SummrayViewSingleCriteria criteriaName="강의력" />
          <SummrayViewSingleCriteria criteriaName="난이도" />
        </HStack>
      </VStack>
    </HStack>
  );
}

function ReviewView() {
  return (
    <VStack
      style={{
        background: 'white',
        marginTop: '10px',
        padding: '32px',
        border: '1px solid #b7b7b7',
        borderRadius: '20px',
        // flexWrap: 'wrap',
        gap: '24px',
      }}
    >
      <VStack
        gap="20px"
        style={{
          minWidth: '96px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 16px 0px 0px',
          borderRight: '1px solid #b7b7b7',
          flexWrap: 'wrap',
        }}
      >
        <VStack
          gap="5px"
          style={{
            minWidth: 'fit-content',
            alignItems: 'center',
            fill: 'var(--accent)',
          }}
        >
          <StarIcon width="24px" height="24px" />
          <Typography variant="t1" children="5.0" />
        </VStack>
        <HStack gap="8px">
          <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="t6" children="학습량" />
            <Tag children="적음" />
          </VStack>
          <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="t6" children="성적" />
            <Tag children="적음" />
          </VStack>
          <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="t6" children="강의력" />
            <Tag children="적음" />
          </VStack>
          <VStack gap="8px" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="t6" children="난이도" />
            <Tag children="적음" />
          </VStack>
        </HStack>
      </VStack>
      <HStack gap="8px">
        {/* style={{ padding: '0px 0px 0px 16px' }} */}
        <VStack
          style={{
            overflow: 'hidden',
            height: 'min-content',
            flexWrap: 'wrap',
            gap: '4px',
          }}
        >
          {/* <span>닉네임 양양쥐 작성일 2024/04/19</span> */}
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
          <Tag children="친절한" />
        </VStack>
        <Typography variant="t5" style={{ lineHeight: '150%' }}>
          <span style={{ color: 'grey' }}>작성내용</span> 아주 좋은강의였습니다 교수님이 매우 착하십니다 난이도도 낮아서
          크게 스트레스 받지않을거같네요! 과제에대해서한가지팁을드..
        </Typography>
      </HStack>
    </VStack>
  );
}

function ReviewsView() {
  const reviews = ['a', 'b'];

  return (
    <HStack className={`${GlobalStyles.metacontainer} ${styles.results}`}>
      <VStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="t3">강의평 목록</Typography>
        <Typography variant="t6">최신순 등록순</Typography>
      </VStack>
      {reviews.map(() => (
        <ReviewView />
      ))}
    </HStack>
  );
}

export function WritePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams();

  // const reviews = [];

  return (
    <HStack style={{ height: '100%' }}>
      <BasicInfoView />
      <SummaryView />
      <ReviewsView />
    </HStack>
  );
}
