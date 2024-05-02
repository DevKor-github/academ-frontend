import React, { useState, useEffect } from 'react';

import { HStack } from './Stack';
import styles from './Carousel.module.css';

interface CarouselProps {
  children: React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
}

export function CarouseHelperImg({ url }: { url: string }) {
  return (
    <div className={styles.carouseImagelItem} style={{ backgroundImage: `url("${url}")` }}>
      <div>
        <img src={url} />
      </div>
    </div>
  );
}

export default function Carousel({ className, style, children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // 5초마다 넘어감
    return () => clearInterval(interval);
  }, []);

  return (
    <HStack style={{ position: 'relative' }}>
      <div className={`${styles.carousel} ${className}`} style={style}>
        <div
          className={styles['carousel-slide']}
          style={{ transform: `translateX(-${currentIndex * 100}%)`, height: '480px' }}
        >
          {children.map((child, index) => (
            <div
              style={{
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.pagination} style={{ marginTop: '440px', zIndex: 20 }}>
        {children.map((_, index) => (
          <span key={index} className={index === currentIndex ? styles.active : ''} onClick={() => goToSlide(index)} />
        ))}
      </div>
    </HStack>
  );
}
