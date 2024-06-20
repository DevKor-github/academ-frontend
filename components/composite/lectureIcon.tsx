export default function LectureIcon({ code }: { code: string }) {
  
  (function ignore(r) {return r})(code);

  return <div style={{
    background: 'grey', aspectRatio: 1, minWidth: '48px', minHeight: '48px',
    maxWidth: '48px', maxHeight: '48px', borderRadius: '24px'
  }} />;
}