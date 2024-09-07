import { CoursePreviewLoading } from '@/components/view/CoursePreview';

export function Box({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col px-8 py-8 bg-neutral-50 dark:bg-neutral-950 flex-grow text-xl text-center md:px-24 gap-8">
      {children}
    </div>
  );
}

export function Grid({ children }: React.PropsWithChildren<{}>) {
  return (
    <div
      className={'grid gap-5 items-start justify-evenly *:min-h-50'}
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      }}
    >
      {children}
    </div>
  );
}

export function LoaderItems() {
  return (
    <>
      <div className="animate-pulse-[0ms]">
        <CoursePreviewLoading />
      </div>
      <div className="animate-pulse-[-100ms]">
        <CoursePreviewLoading />
      </div>
      <div className="animate-pulse-[-200ms]">
        <CoursePreviewLoading />
      </div>
      <div className="animate-pulse-[-300ms]">
        <CoursePreviewLoading />
      </div>
      <div className="animate-pulse-[-400ms]">
        <CoursePreviewLoading />
      </div>
      <div className="animate-pulse-[-500ms]">
        <CoursePreviewLoading />
      </div>
      <div className="animate-pulse-[-600ms]">
        <CoursePreviewLoading />
      </div>
      <div className="animate-pulse-[-700ms]">
        <CoursePreviewLoading />
      </div>
      <div className="animate-pulse-[-800ms]">
        <CoursePreviewLoading />
      </div>
      <div className="animate-pulse-[-900ms]">
        <CoursePreviewLoading />
      </div>
    </>
  );
}

export function SkeletonLoader() {
  return (
    <Grid>
      <LoaderItems />
    </Grid>
  );
}
