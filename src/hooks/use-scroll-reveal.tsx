import { useRef } from 'react';
import { useInView, type UseInViewOptions } from 'framer-motion';

export const useScrollReveal = (margin?: UseInViewOptions['margin']) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: margin || '-100px' });

  return { ref, isInView };
};

// Variants for different animation types
export const scrollVariants = {
  scattered: {
    initial: { 
      opacity: 0, 
      y: 60, 
      x: -30, 
      rotate: -8,
      scale: 0.9,
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      rotate: 0,
      scale: 1,
    },
  },
  scatteredRight: {
    initial: { 
      opacity: 0, 
      y: 60, 
      x: 30, 
      rotate: 8,
      scale: 0.9,
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      rotate: 0,
      scale: 1,
    },
  },
  floatUp: {
    initial: { 
      opacity: 0, 
      y: 80, 
      rotate: -5,
      filter: 'blur(10px)',
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      filter: 'blur(0px)',
    },
  },
  depth: {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      rotateX: 45,
      z: -100,
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotateX: 0,
      z: 0,
    },
  },
  assemble: {
    initial: { 
      opacity: 0,
      y: 100,
      x: -50,
      rotate: -15,
      scale: 0.7,
    },
    animate: { 
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      scale: 1,
    },
  },
};
