import DiagnosticClient from './client';

export default function DiagnosticPage() {

  return (
    <div className="p-10 text-xl">
      Academ Frontend Version: {process.env.APP_VERSION}
      <DiagnosticClient />
    </div>
  );
}
