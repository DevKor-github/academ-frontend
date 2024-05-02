import React, { useRef, useEffect, forwardRef } from 'react';

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

interface PopoverProps {
  className?: string;
  onClose: (...args: never[]) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  keep?: boolean;
}

const Popover = React.memo<PopoverProps>((props) => {
  const { onClose, children } = props;

  const settingsWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (!props.keep || !settingsWindowRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener('click', pageClickEvent, true);

    return () => {
      window.removeEventListener('click', pageClickEvent, true);
    };
  }, []);

  return (
    <Wrapper className={props.className} style={props.style} ref={settingsWindowRef}>
      {children}
    </Wrapper>
  );
});

export default Popover;
