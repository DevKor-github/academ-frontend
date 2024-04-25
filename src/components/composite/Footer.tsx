import Spacer from '../Spacer';
import AdaptiveStack from '../base/AdaptiveStack';
import A from '../base/A';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer>
      <AdaptiveStack className={`${styles.padding}`} hGap="10px">
        <AdaptiveStack vGap="20px" hGap="20px">
          Academ
          <A style="monotone" href="/policy">
            이용약관
          </A>
          <A style="monotone" href="/policy">
            제보 및 신고
          </A>
        </AdaptiveStack>
        <Spacer />
        <AdaptiveStack>Copyright ⓒ 2024 Academ. all rights reserved</AdaptiveStack>
      </AdaptiveStack>
    </footer>
  );
}
