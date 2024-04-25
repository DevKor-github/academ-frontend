import React, { useState, useEffect } from 'react';

import styles from './Carousel.module.css';

interface CarouselProps {
  children: React.ReactNode[];
}

export default function Carousel({ children }: CarouselProps) {
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
    <div className={styles.carousel}>
      <div className={styles['carousel-slide']} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
      <div className={styles.pagination}>
        {children.map((_, index) => (
          <span key={index} className={index === currentIndex ? styles.active : ''} onClick={() => goToSlide(index)} />
        ))}
      </div>
    </div>
  );
}
