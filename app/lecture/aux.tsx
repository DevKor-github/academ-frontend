import { SkeletonDiv } from "@/components/composite/skeleton";

export function Box({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col pb-8 pt-8 bg-neutral-50 dark:bg-neutral-950 flex-grow text-xl text-center pl-8 pr-8 md:pl-24 md:pr-24">
      {children}
    </div>
  );
}

export function Grid({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className='grid gap-5 items-start justify-evenly'
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
      }}>
      {children}
    </div>
  );
}

export function SkeletonLoader() {
  return <Grid>
    <SkeletonDiv>asdf</SkeletonDiv>
    <SkeletonDiv>asdf</SkeletonDiv>
    <SkeletonDiv>asdf</SkeletonDiv>
  </Grid>
}