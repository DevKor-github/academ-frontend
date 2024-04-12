import { useParams } from 'react-router-dom';

import { HStack, VStack, Spacer } from '../../components';

export function LecturePage() {
  const { id } = useParams();

  // const reviews = [];

  return (
    <HStack>
      <VStack>{id} 강의정보정보디자인 송운비 교수님</VStack>

      <VStack>평가 한 눈에 보기</VStack>

      <VStack>
        강의평 목록
        <Spacer />
        최신순 등록순
      </VStack>
    </HStack>
  );
}
