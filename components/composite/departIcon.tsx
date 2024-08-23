export default function DepartIcon({ code, kind = 'SMALL' }: { code: string; kind?: 'BIG' | 'SMALL' }) {
  (function ignore(r) {
    return r;
  })(code);

  const imageUrl = `url(${'/cicon/ku.jpg'})`;

  return (
    <div
      className="flex flex-row justify-center items-center overflow-clip w-full h-full"
      style={{
        backgroundImage: imageUrl,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        aspectRatio: 1,
        overflow: 'clip',
      }}
    >
      {/* <img
        className="absolute z-10"
        loading="eager"
        src={imageUrl}
        alt="banner image"
        width={81}
        height={105}
        style={{
          padding: smallScale,
          // borderRadius: scale,
          height: scale,
          width: scale,
          objectFit: 'contain',
        }}
      /> */}
    </div>
  );
}