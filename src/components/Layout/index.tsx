import TopNav from '../Topnav';
// import HStack from '../HStack';
import Footer from '../Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: '1fr auto', minHeight: '100vh' }}>
      <TopNav />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </div>
  );
}
