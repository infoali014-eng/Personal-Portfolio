import React from 'react';
import { Search, BookOpen, AlertCircle, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  variant?: 'no-results' | 'no-data' | 'offline' | 'error';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'no-data',
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  const icons = {
    'no-results': <Search className="h-8 w-8 text-muted" />,
    'no-data': <BookOpen className="h-8 w-8 text-muted" />,
    'offline': <WifiOff className="h-8 w-8 text-muted animate-pulse" />,
    'error': <AlertCircle className="h-8 w-8 text-danger animate-bounce" />,
  };

  return (
    <div
      className={cn(
        'border border-dashed border-primary/10 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 bg-surface/50 transition-colors duration-300',
        className
      )}
    >
      <div className="flex justify-center">{icons[variant]}</div>
      <div className="space-y-1">
        <h4 className="font-bold text-text">{title}</h4>
        <p className="text-xs text-muted leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
