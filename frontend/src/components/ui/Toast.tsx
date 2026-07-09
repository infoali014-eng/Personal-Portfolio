import React from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface ToastProps {
  isOpen: boolean;
  message: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  message,
  variant = 'info',
  onClose,
}) => {
  const styles = {
    success: 'border-success/20 bg-success/5 text-success',
    warning: 'border-warning/20 bg-warning/5 text-warning',
    error: 'border-danger/20 bg-danger/5 text-danger',
    info: 'border-accent/20 bg-accent/5 text-accent',
  };

  const icons = {
    success: <CheckCircle className="h-4 w-4 shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 shrink-0" />,
    error: <AlertCircle className="h-4 w-4 shrink-0" />,
    info: <Info className="h-4 w-4 shrink-0" />,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={cn(
            'fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border p-4 shadow-xl glass max-w-sm',
            styles[variant]
          )}
          role="alert"
        >
          {icons[variant]}
          <span className="text-xs font-medium leading-relaxed">{message}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-0.5 rounded-full text-current hover:bg-primary/5 shrink-0"
            aria-label="Close notification"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
