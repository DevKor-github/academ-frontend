import TopNav from '../Topnav';
import HStack from '../HStack';
import Footer from '../Footer';

// import styles from './index.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
      <TopNav />
      <HStack style={{ margin: '40px' }}>
        {children}
        {children}
      </HStack>
      <Footer />
    </div>
  );
}
