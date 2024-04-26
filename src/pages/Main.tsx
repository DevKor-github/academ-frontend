import { SearchForm } from '../components/composite';
import { HStack, VStack, Typography } from '../components';

import styles from './Main.module.css';

export function MainPage() {
  return (
    <HStack gap="20px" type="center" style={{ padding: '100px 40px', width: '100%' }}>
      <HStack type="center" gap="10px">
        <VStack>
          <Typography variant="t2" style={{ fontWeight: 'bold' }}>
            강의명
          </Typography>
          <Typography variant="t2">으로 검색해보세요</Typography>
        </VStack>
        <Typography variant="t5">e.g., Lorem Ipsum, Lorem Ipsum</Typography>
      </HStack>
      <VStack style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <SearchForm className={styles.searchForm} />
      </VStack>
    </HStack>
  );
}
