import { useState, ChangeEvent } from "react";
import { VStack, HStack } from "@/components/basic/stack";
import Button from "@/components/basic/button";
import Checkbox from "@/components/basic/checkbok";

export default function Step0({ next }: { next: () => void }) {
  const [agreements, setAgreements] = useState({
    termsAgreed: false,
    personalInfoAgreed: false,
  });
  const [allAgreed, setAllAgreed] = useState(false);

  const handelAgreementChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }));
    const allChecked = Object.values({ ...agreements, [name]: checked }).every((value) => value === true);
    setAllAgreed(allChecked);
  };

  const handleAllAgreementChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setAgreements({
      termsAgreed: checked,
      personalInfoAgreed: checked,
    });

    setAllAgreed(checked);
  };

  return (
    <HStack className='h-full w-full justify-center' gap="20px">
      <div
        className='w-full'
        style={{
          backgroundColor: allAgreed ? 'rgba(230, 90, 118, 0.05)' : '#F5F5F5',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <VStack style={{ justifyContent: 'space-between' }}>
          <span className="text-xl" style={{ color: allAgreed ? '#DC143C' : '#737373' }}>
            이용약관 전체 동의
          </span>
          <Checkbox checked={allAgreed} onChange={handleAllAgreementChange} />
        </VStack>
      </div>
      <div
        style={{
          backgroundColor: allAgreed ? 'rgba(230, 90, 118, 0.05)' : '#F5F5F5',
          padding: '20px',
          borderRadius: '12px',
        }}
      >
        <HStack gap="10px">
          <VStack style={{ justifyContent: 'space-between', paddingLeft: '5px' }}>
            <span className="text-xl">이용약관 (필수)</span>
            <Checkbox name="termsAgreed" checked={agreements.termsAgreed} onChange={handelAgreementChange} />
          </VStack>
          <div
            style={{
              backgroundColor: 'white',
              padding: '15px',
              width: '100%',
              height: '250px',
              borderRadius: '12px',
              marginBottom: '20px',
              overflowY: 'scroll',
            }}
          ></div>
          <VStack style={{ justifyContent: 'space-between', paddingLeft: '5px' }}>
            <span className="text-xl">개인정보 수집 동의 (필수)</span>
            <Checkbox
              name="personalInfoAgreed"
              checked={agreements.personalInfoAgreed}
              onChange={handelAgreementChange}
            />
          </VStack>
          <div
            style={{
              backgroundColor: 'white',
              padding: '15px',
              width: '100%',
              height: '250px',
              borderRadius: '12px',
              overflowY: 'scroll',
            }}
          ></div>
        </HStack>
      </div>

      <Button
        kind="filled"
        disabled={!allAgreed}
        variant="contained"
        color="primary"
        onClick={() => (allAgreed ? next() : undefined)}
      >
        회원가입
      </Button>
    </HStack>
  );
}