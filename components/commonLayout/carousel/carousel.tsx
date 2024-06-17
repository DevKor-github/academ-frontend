"use client";

import React, { useEffect, useState } from 'react';

import { HStack } from '@/components/basic/stack';

import Image from 'next/image';

interface CarouselProps {
  children: React.ReactNode[];
  style?: React.CSSProperties;
  className?: string;
}

export function CarouselItem({ url, children }: { url: string; children?: React.ReactNode }) {
  return (
    <div className={`flex justify-center items-center dark h-full relative`} style={{ backgroundColor: 'grey', minWidth: '100%'}}>
      <Image className='absolute z-10' loading="lazy" layout='fill' objectFit="cover" src={url} alt='banner image' />
      <div className='z-10 size-full flex justify-center items-center pt-20'>{children}</div>
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
  }, [children.length]);

  return (
    <HStack className='relative top-0 h-96 md:h-128 overflow-hidden transition-all'>
      <div className={`overflow-hidden  transition-all ralative bg-cyan-500 top-0 h-96  md:h-128  w-full ${className}`}>
        <div className="flex flew-row transition-all bg-red-600 absolute top-0 w-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {children.map((child, index) => (
            <div className='relative bg-slate-500 transition-all justify-center items-center h-96 md:h-128 w-full' style={{ flex :'0 0 100%' }}
              key={index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className='z-10 justify-center flex pt-2 pb-2'>
        {children.map((_, index) => (
          <span
            key={index}
            className={
              "inline-block h-1 cursor-pointer transition-all ml-1 mr-1 " +
              "bg-neutral-950 dark:bg-neutral-50 " + (index === currentIndex ? "background-color: white; w-10" : "w-5 opacity-50")}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </HStack>
  );
}
