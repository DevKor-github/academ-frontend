// Note : loading.tsx is for page.tsx

import { HStack, VStack } from '@/components/basic/stack';
import { SkeletonDiv } from "@/components/composite/skeleton"

import styles from "./common.module.css";

const SearchTopViewLoading = () => {
  
  return (
      <VStack
      className="border-b border-b-neutral-200"
      style={{
        padding: '110px 40px 110px 40px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <div />
    </VStack>
  );
};



function Box({ children } : {children : React.ReactNode}) {
  return <HStack className='pb-8 pt-8 light:bg-neutral-50 dark:bg-neutral-950 flex-grow text-xl text-center pl-8 pr-8 md:pl-24 md:pr-24'>{children}</HStack>
}

export function SearchBotLoading() {
  return <Box>
    <div className={styles.container}>
      <SkeletonDiv style={{minHeight : "240px", width: "100%", borderRadius : "24px", backgroundColor: "#00000011", animationDelay: '0s'}} >asdf</SkeletonDiv>
      <SkeletonDiv className='hidden lg:block' style={{minHeight : "240px", width: "100%", borderRadius : "24px", backgroundColor: "#00000011", animationDelay: '0.15s'}} >asdf</SkeletonDiv>
      <SkeletonDiv className='hidden xl:block' style={{minHeight : "240px", width: "100%", borderRadius : "24px", backgroundColor: "#00000011", animationDelay: '0.3s'}} >asdf</SkeletonDiv>
    </div>
    </Box>
}

export default function SearchLoading() {
  return (
    <HStack className='h-full'>
      <SearchTopViewLoading  />
      <SearchBotLoading />
    </HStack>
  );
}