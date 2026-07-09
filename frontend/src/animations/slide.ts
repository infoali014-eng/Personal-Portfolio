import type { Variants } from 'framer-motion';

export const slideIn = (
  direction: 'up' | 'down' | 'left' | 'right', 
  type: 'tween' | 'spring' | 'inertia' | 'keyframes' = 'tween', 
  delay = 0, 
  duration = 0.5
): Variants => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});
