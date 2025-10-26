import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useCursor } from '@/hooks/use-cursor';

const CustomCursor = () => {
  const { position, isHovering, isVisible } = useCursor();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    cursorX.set(position.x);
    cursorY.set(position.y);
  }, [position, cursorX, cursorY]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isHovering ? 1.8 : 1,
            rotate: isHovering ? 90 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="w-10 h-10 rounded-full bg-primary/40 blur-lg" />
          <div className="absolute inset-0 w-10 h-10 rounded-full border-2 border-primary/60 animate-glow-pulse" />
          {isHovering && (
            <motion.div
              className="absolute inset-0 w-10 h-10 rounded-full border border-accent/40"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{
          left: position.x,
          top: position.y,
          x: '-50%',
          y: '-50%',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary via-accent to-secondary shadow-glow blur-[2px]" />
      </motion.div>

      {/* Ripple effects on click */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="pointer-events-none fixed z-[9997] rounded-full border-2 border-primary/50"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
            }}
            initial={{ width: 20, height: 20, opacity: 1 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
