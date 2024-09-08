export default function DepartIcon({ code }: { code: string }) {
  (function ignore(r) {
    return r;
  })(code);

  const imageUrl = `url(${'/cicon/ku.jpg'})`;

  return (
    <span className="inline-flex p-[0.25em] items-center justify-center bg-white rounded-full overflow-clip aspect-square">
      <span
        className="flex flex-row justify-center items-center bg-contain bg-center bg-no-repeat mt-[0.125em]"
        style={{
          backgroundImage: imageUrl,
          width: '1em',
          height: '1em',
        }}
      />
    </span>
  );
}
