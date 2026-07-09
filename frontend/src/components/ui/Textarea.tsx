import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, success, rows = 4, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex w-full rounded-lg bg-surface border border-primary/10 px-3 py-2 text-sm text-text placeholder-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none',
          error ? 'border-danger focus:ring-danger/40' : 
          success ? 'border-success focus:ring-success/40' : 
          'border-primary/10 focus:border-accent focus:ring-accent/40',
          className
        )}
        rows={rows}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
