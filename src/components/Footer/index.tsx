import VStack from '../VStack';
import Spacer from '../Spacer';
import A from '../A';

import styles from './index.module.css';

export default function Footer() {
  return (
    <footer>
      <VStack className={styles.padding}>
        <VStack>
          Logo Name
          <A style="monotone" href="/policy">
            이용약관
          </A>
          <A style="monotone" href="/policy">
            제보 및 신고
          </A>
          <A style="monotone" href="/policy">
            Lorem
          </A>
        </VStack>
        <Spacer />
        <VStack>Copyright ⓒ 2024 Academ. all rights reserved</VStack>
      </VStack>
    </footer>
  );
}
