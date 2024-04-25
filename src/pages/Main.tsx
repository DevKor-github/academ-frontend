import { SearchForm } from '../components/composite';
import { HStack, VStack, Typography } from '../components';

export function MainPage() {
  return (
    <HStack gap="20px" type="center" style={{ padding: '100px 40px' }}>
      <HStack type="center" gap="10px">
        <VStack>
          <Typography variant="t2" style={{ fontWeight: 'bold' }}>
            강의명
          </Typography>
          <Typography variant="t2">으로 검색해보세요</Typography>
        </VStack>
        <Typography variant="t5">e.g., Lorem Ipsum, Lorem Ipsum</Typography>
      </HStack>
      <VStack>
        <SearchForm />
      </VStack>
    </HStack>
  );
}
