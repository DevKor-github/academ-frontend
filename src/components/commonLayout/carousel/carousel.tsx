'use client';

import React, { useEffect, useState } from 'react';

import { HStack } from '@/components/basic/stack';

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
}

export default function Carousel({ className, children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // 5초마다 넘어감
    return () => clearInterval(interval);
  }, [children.length]);

  const controlBar = (
    <div className="z-10 justify-center flex pt-2 pb-2">
      {children.map((_, index) => (
        <span
          key={index}
          className={
            'inline-block h-1 rounded-sm cursor-pointer transition-all ml-1 mr-1 ' +
            'bg-neutral-950 dark:bg-neutral-50 ' +
            (index === currentIndex ? 'background-color: white; w-10' : 'w-5 opacity-50')
          }
          onClick={() => goToSlide(index)}
        />
      ))}
    </div>
  );

  return (
    <HStack className="relative top-0 h-96 md:h-108 overflow-hidden transition-all">
      <div className={`overflow-hidden transition-all ralative h-96 md:h-108 w-full ${className}`}>
        <div
          className="flex flew-row transition-all bg-red-600 absolute top-0 w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div
              className="relative bg-slate-500 transition-all justify-center items-center h-96 md:h-108 w-full"
              style={{ flex: '0 0 100%' }}
              key={index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {controlBar}
    </HStack>
  );
}
