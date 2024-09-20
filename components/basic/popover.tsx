'use client';

import React, { forwardRef, useRef, useEffect } from 'react';

interface WrapperProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Wrapper = forwardRef(({ className, children, style }: WrapperProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div className={className} ref={ref} style={style}>
      {children}
    </div>
  );
});

Wrapper.displayName = 'Wrapper';

interface PopoverProps {
  className?: string;
  hide: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  keep?: boolean;
}

const Popover = React.memo<PopoverProps>(({ hide, children, style, className }) => {
  const settingsWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (/* !props.keep || */ !settingsWindowRef.current?.contains(e.target as Node)) {
        hide();
      }
    };

    window.addEventListener('click', pageClickEvent, true);

    return () => {
      window.removeEventListener('click', pageClickEvent, true);
    };
  });

  const combined: React.CSSProperties = { zIndex: 100, ...style };

  return (
    <Wrapper
      className={className}
      style={combined}
      // ref={settingsWindowRef}
    >
      {children}
    </Wrapper>
  );
});

Popover.displayName = 'Popover';

export default Popover;
