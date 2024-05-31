import styles from '../common.module.css';
import GlobalStyles from '../../../Global.module.css';
import { VStack, HStack, Typography, Tag } from '../../../components';

export function BasicInfoView() {
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
}
