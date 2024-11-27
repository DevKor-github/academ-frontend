import ErrorTemplate from '@/lib/template';

export default function Custom404() {
  return <ErrorTemplate title="404" subtitle="해당하는 페이지가 없습니다." />;
}
