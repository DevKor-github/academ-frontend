import { SearchForm } from '../components/composite';
import { HStack, VStack, Typography } from '../components';

import styles from './Main.module.css';

export function MainPage() {
  return (
    <HStack gap="20px" type="center" style={{ padding: '100px 40px', width: '100%' }}>
      <HStack type="center" gap="10px">
        <Typography variant="t1" style={{ fontWeight: 'bold' }}>
          어떤 강의를 찾으시나요?
        </Typography>
        <Typography variant="t5">강의명, 교수명, 학수번호로 검색해보세요.</Typography>
      </HStack>
      <VStack style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <SearchForm className={styles.searchForm} />
      </VStack>
    </HStack>
  );
}
