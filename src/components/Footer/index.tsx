import VStack from '../VStack';
import Spacer from '../Spacer';

import styles from './index.module.css';

export default function Footer() {
  return (
    <footer>
      <VStack className={styles.padding}>
        <VStack>Logo Name</VStack>
        <Spacer />
        <VStack>Copyright ⓒ 2024 Academ. all rights reserved</VStack>
      </VStack>
    </footer>
  );
}
