import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = true,
  glass = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-xl p-6 transition-all duration-300',
        glass ? 'glass' : 'bg-surface border border-primary/10',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-lg hover:border-accent/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
