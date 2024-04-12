import Spacer from '../Spacer';
import AdaptiveStack from '../AdaptiveStack';
import A from '../A';

import styles from './index.module.css';

export default function Footer() {
  return (
    <footer>
      <AdaptiveStack className={`${styles.padding}`} hGap="10px">
        <AdaptiveStack vGap="20px" hGap="20px">
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
        </AdaptiveStack>
        <Spacer />
        <AdaptiveStack>Copyright ⓒ 2024 Academ. all rights reserved</AdaptiveStack>
      </AdaptiveStack>
    </footer>
  );
}
