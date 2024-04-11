import TopNav from '../Topnav';
import HStack from '../HStack';
import Footer from '../Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <HStack>
      <TopNav />
      <HStack>{children}</HStack>
      <Footer />
    </HStack>
  );
}
