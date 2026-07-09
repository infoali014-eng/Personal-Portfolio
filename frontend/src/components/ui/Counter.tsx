import React, { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  duration = 1.5,
  prefix = '',
  suffix = '',
  className,
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-50px' });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        node.textContent = `${prefix}${Math.floor(value)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [value, isInView, duration, prefix, suffix]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
};
