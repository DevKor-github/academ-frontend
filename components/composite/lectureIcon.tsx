export default function LectureIcon({ code , kind = "SMALL"}: { code: string, kind? : "BIG" | "SMALL" }) {
  
  (function ignore(r) { return r })(code);
  
  const scale = (kind === "BIG") ? "80px" : "48px";

  return <div style={{
    background: 'grey', aspectRatio: 1, minWidth: scale, minHeight: scale,
    maxWidth: scale, maxHeight: scale, borderRadius: scale
  }} />;
}