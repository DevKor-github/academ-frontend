import Image from 'next/image';

export default function LectureIcon({ code, kind = 'SMALL' }: { code: string; kind?: 'BIG' | 'SMALL' }) {
  (function ignore(r) {
    return r;
  })(code);

  const scale = kind === 'BIG' ? '80px' : '48px';
  const smallScale = kind === 'BIG' ? '12px' : '4px';

  return (
    <div
      className="flex flex-row justify-center items-center overflow-clip"
      style={{
        background: 'white',
        aspectRatio: 1,
        minWidth: scale,
        minHeight: scale,
        width: scale,
        height: scale,
        maxWidth: scale,
        maxHeight: scale,
        borderRadius: scale,
        overflow: 'clip',
      }}
    >
      <Image
        className="absolute z-10"
        loading="eager"
        src="/cicon/symbol_2.jpg"
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
      />
    </div>
  );
}
