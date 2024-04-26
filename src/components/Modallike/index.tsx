import React, { useState, useRef, useEffect } from 'react';

import { useRenderTrigger } from '../../contexts/RenderTriggerContext';

import styles from './index.module.css';

interface ModallikeProps {
  children: React.ReactNode;
}

export default function Modallike({ children }: ModallikeProps) {
  const { trap } = useRenderTrigger();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && modalRef.current) {
      const { width: prevWidth, height: prevHeight } = modalRef.current.style;
      modalRef.current.style.width = '';
      modalRef.current.style.height = '';
      setWidth(ref.current.getBoundingClientRect().width + 82);
      setHeight(ref.current.getBoundingClientRect().height + 80);
      modalRef.current.style.width = prevWidth;
      modalRef.current.style.height = prevHeight;
      modalRef.current.getBoundingClientRect(); // never ever delete this line (intended)
    }
  }, [trap]);

  return (
    <div className={styles.container}>
      <div ref={modalRef} className={styles.modal} style={{ width, height }}>
        <div ref={ref} style={{ width: 'fit-content', height: 'fit-content', margin: '40px 40px 40px 40px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
