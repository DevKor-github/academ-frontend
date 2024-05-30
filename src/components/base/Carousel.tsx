import React, { useState, useEffect } from 'react';

import { HStack } from './Stack';
import styles from './Carousel.module.css';

interface CarouselProps {
  children: React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
}

export function CarouselItem({ url, children }: { url: string; children?: React.ReactNode }) {
  return (
    <div className={`${styles.carouseImagelItem} ${styles['adaptive-height']}`} style={{ backgroundColor: 'grey' }}>
      <div style={{ backgroundImage: `url("${url}")` }}>
        <div>
          <div>{children}</div>
        </div>
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
      <div className={`${styles.carousel} ${className} ${styles['adaptive-height']}`} style={style}>
        <div className={styles['carousel-slide']} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
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
      <div className={`${styles.pagination} ${styles['adaptive-margin']}`} style={{ zIndex: 20 }}>
        {children.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? styles.active : styles.deactive}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </HStack>
  );
}
