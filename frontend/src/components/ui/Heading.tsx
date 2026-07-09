import React from 'react';
import { cn } from '@/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  variant = 'h2',
  as,
  ...props
}) => {
  const Component = as || (variant === 'display' ? 'h1' : variant);

  const styles = {
    display: 'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text leading-[1.1] -letter-spacing-[0.04em]',
    h1: 'text-3xl sm:text-4xl font-extrabold tracking-tight text-text leading-[1.2] -letter-spacing-[0.03em]',
    h2: 'text-2xl sm:text-3xl font-bold tracking-tight text-text leading-[1.3] -letter-spacing-[0.02em]',
    h3: 'text-xl font-bold tracking-tight text-text leading-[1.4] -letter-spacing-[0.01em]',
    h4: 'text-base font-semibold tracking-tight text-text leading-[1.4]',
  };

  return (
    <Component
      className={cn(styles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
