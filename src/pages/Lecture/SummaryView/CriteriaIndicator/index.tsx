import { Typography, HStack, VStack, Tag, Progress } from '../../../../components';

interface CriteriaIndicatorProp {
  name: string;
  low: string;
  high: string;
  rate: number;
}

export function CriteriaIndicator({ name, low, high, rate }: CriteriaIndicatorProp) {
  return (
    <HStack gap="10px">
      <VStack style={{ justifyContent: 'start', alignItems: 'center' }} gap="8px">
        <Typography variant="t5" children={name} />
        <Typography variant="t3" children={rate} />
      </VStack>
      <HStack gap="10px" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--d4d4d4)' }}>
        <VStack style={{ justifyContent: 'space-between' }}>
          <Tag children={low} />
          <Tag children={high} />
        </VStack>
        <Progress rate={rate / 5} />
      </HStack>
    </HStack>
  );
}
