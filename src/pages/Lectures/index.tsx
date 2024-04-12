export function LecturesPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q');
  return <div>{q}에 대한 검색</div>;
}
