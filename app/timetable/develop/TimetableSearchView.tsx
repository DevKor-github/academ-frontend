import { HStack } from '@/components/basic/stack';
import SearchForm from '@/components/composite/SearchForm';

function Scroll({ children }: React.PropsWithChildren) {
  return (
    <HStack className="h-full w-full transition-all light:bg-base-31 dark:bg-base-2">
      <div className="overflow-y-scroll w-full">
        <div className="flex flex-col h-fit pt-4 gap-4">{children}</div>
      </div>
    </HStack>
  );
}

export function TimetableSearchView() {
  return (
    <HStack>
      <SearchForm />
      <Scroll></Scroll>
    </HStack>
  );
}
