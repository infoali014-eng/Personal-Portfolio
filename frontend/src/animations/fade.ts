import type { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    transition: {
      duration: custom?.duration ?? 0.5,
      delay: custom?.delay ?? 0,
      ease: 'easeOut',
    },
  }),
};

export const fadeInDirection = (direction: 'up' | 'down' | 'left' | 'right', distance = 20): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
  },
  visible: (custom?: { duration?: number; delay?: number }) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: custom?.duration ?? 0.5,
      delay: custom?.delay ?? 0,
      ease: 'easeOut',
    },
  }),
});
