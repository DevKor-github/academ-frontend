import TopNav from './topnav';
import Footer from './footer';

export default function CommonLayout({ children, highlight = '' }: React.PropsWithChildren<{ highlight?: string }>) {
  const overlap = highlight === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNav className={overlap ? 'absolute top-0 z-50' : 'relative'} location={highlight} />
      <main className={'flex-grow'}>{children}</main>
      <Footer />
    </div>
  );
}
