import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export const useScrollParallax = () => {
  const scrollY = useMotionValue(0);
  const smoothScrollY = useSpring(scrollY, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return smoothScrollY;
};
