import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '@/hooks/use-cursor';

const CustomCursor = () => {
  const { position, isHovering, isVisible } = useCursor();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    cursorX.set(position.x);
    cursorY.set(position.y);
  }, [position, cursorX, cursorY]);

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
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="w-8 h-8 rounded-full bg-primary/30 blur-md" />
          <div className="absolute inset-0 w-8 h-8 rounded-full border-2 border-primary/50" />
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
        transition={{ duration: 0.15 }}
      >
        <div className="w-2 h-2 rounded-full bg-primary shadow-glow" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
