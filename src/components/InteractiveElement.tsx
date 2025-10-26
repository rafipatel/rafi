import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface InteractiveElementProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  as?: 'div' | 'a' | 'button';
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const InteractiveElement = ({ 
  children, 
  className = '', 
  glowColor = 'hsl(173 80% 60%)',
  as = 'div',
  ...props 
}: InteractiveElementProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Component = motion[as] as any;

  return (
    <Component
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      {...props}
    >
      {/* Glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            boxShadow: `0 0 30px ${glowColor}40, 0 0 60px ${glowColor}20`,
            border: `1px solid ${glowColor}30`,
          }}
        />
      )}
      
      {/* Ripple effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{
            border: `2px solid ${glowColor}`,
          }}
        />
      )}
      
      {children}
    </Component>
  );
};

export default InteractiveElement;
