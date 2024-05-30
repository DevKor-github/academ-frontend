import Spacer from '../Spacer';
import AdaptiveStack from '../base/AdaptiveStack';
import A from '../base/A';
import { LogoIconRich } from '../../icons';
import GlobalStyle from '../../Global.module.css';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={`${GlobalStyle.metacontainer}`}>
      <AdaptiveStack className={`${styles.padding}`} hGap="10px">
        <AdaptiveStack vGap="20px" hGap="20px">
          <LogoIconRich overlap={false} width={`${150 * 0.6}px`} height={`${39 * 0.6}px`} />
          <div style={{ height: 'fit-content' }}>
            <A style="monotone" href="/policy">
              이용약관
            </A>
          </div>
          <div style={{ height: 'fit-content' }}>
            <A style="monotone" href="/policy">
              버그리포트
            </A>
          </div>
        </AdaptiveStack>
        <Spacer />
        <AdaptiveStack>Copyright ⓒ 2024 Academ. all rights reserved</AdaptiveStack>
      </AdaptiveStack>
    </footer>
  );
}
