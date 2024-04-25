import TopNav from '../Topnav';
import Footer from '../composite/Footer';

// import styles from './index.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
      <TopNav />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
