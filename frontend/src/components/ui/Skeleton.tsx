import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'block' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'block',
  ...props
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-primary/10',
        variant === 'circle' ? 'rounded-full' : 'rounded-lg',
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;
