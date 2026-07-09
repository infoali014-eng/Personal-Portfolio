import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  size = 'md',
  ...props
}) => {
  const paddings = {
    sm: 'py-6 md:py-10',
    md: 'py-12 md:py-20',
    lg: 'py-16 md:py-24',
  };

  return (
    <section
      className={cn(paddings[size], className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
