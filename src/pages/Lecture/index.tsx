import { useParams } from 'react-router-dom';

import { StarIcon } from '../../icons';
import { HStack, VStack, Tag, Typography, Progress } from '../../components';

import styles from './index.module.css';

const BasicInfoView: React.FC<Record<string, never>> = () => {
  return (
    <VStack
      style={{
        margin: '160px 40px 0px 40px',
        padding: '0px 0px 60px 0px',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderBottom: '1px solid #d4d4d4',
      }}
    >
      <div
        style={{
          height: '80px',
          width: '80px',
          aspectRatio: 1,
          borderRadius: '52px',
          background: '#d9d9d9',
          marginRight: '20px',
        }}
      />
      <HStack gap="10px">
        <VStack gap="10px" style={{ alignItems: 'end' }}>
          <Typography variant="t3" children="기초 정보 디자인" />
          <Tag children="강의평 8개" />
        </VStack>
        <VStack gap="20px">
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
    <HStack gap="30px" style={{ margin: '40px' }}>
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
        margin: '20px 0px',
        padding: '32px',
        border: '1px solid #b7b7b7',
        borderRadius: '20px',
      }}
    >
      <VStack
        gap="20px"
        style={{
          minWidth: 'fit-content',
          alignItems: 'center',
          padding: '0px 16px 0px 0px',
          borderRight: '1px solid #b7b7b7',
        }}
      >
        <VStack
          gap="5px"
          style={{
            minWidth: 'fit-content',
            alignItems: 'center',
          }}
        >
          <StarIcon style={{ width: '24px', height: '24px', aspectRatio: 1, color: '#dc143c', stroke: 'none' }} />
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
      <HStack style={{ padding: '0px 0px 0px 16px' }}>
        <VStack style={{ flexWrap: 'nowrap', overflow: 'hidden', height: 'min-content' }}>
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
        <VStack>
          작성내용
          <HStack>
            아주 좋은강의였습니다 교수님이 매우 착하십니다 난이도도 낮아서 크게 스트레스 받지않을거같네요!
            과제에대해서한가지팁을드..
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}

function ReviewsView() {
  const reviews = ['a', 'b'];

  return (
    <HStack className={styles.ReviewView} style={{ padding: '40px', flexGrow: 1 }}>
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

export function LecturePage() {
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
