function Box({ children }: React.PropsWithChildren<unknown>) {
  return (
    <div
      className="md:p-8 p-2 w-full min-h-full flex flex-col gap-12
  justify-center
  items-center
  [&>h3]:font-bold
  [&>h3]:text-3xl"
    >
      {children}
    </div>
  );
}

function AcdApiErrorPage({ error, reset }: ErrorProps<Error>) {
    return (
      <Box>
        <h3>알 수 없는 오류가 발생했습니다.</h3>
      </Box>
    );
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return error instanceof Error ? <AcdApiErrorPage error={error} reset={reset} /> : <Box />;
}
