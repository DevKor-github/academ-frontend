import TopNav from '../commonLayout/topnav';
import Footer from '../commonLayout/footer';

export default function CommonLayout({ children }: React.PropsWithChildren<{}>) {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNav />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
}
