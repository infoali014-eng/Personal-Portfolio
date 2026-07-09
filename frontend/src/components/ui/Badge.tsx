import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'tech' | 'category' | 'status' | 'danger' | 'success' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'tech',
  ...props
}) => {
  const styles = {
    tech: 'bg-primary/5 text-muted hover:bg-primary/10 border border-primary/5 font-mono text-[10px] uppercase tracking-wider',
    category: 'bg-accent/10 text-accent border border-accent/10 font-mono text-[10px] uppercase tracking-wider',
    status: 'bg-accent/5 text-accent border border-accent/20 font-mono text-[10px] uppercase tracking-wider',
    danger: 'bg-danger/10 text-danger border border-danger/10 font-mono text-[10px] uppercase tracking-wider',
    success: 'bg-success/10 text-success border border-success/10 font-mono text-[10px] uppercase tracking-wider',
    warning: 'bg-warning/10 text-warning border border-warning/10 font-mono text-[10px] uppercase tracking-wider',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium transition-colors duration-200',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
