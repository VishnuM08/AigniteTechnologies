import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 120, damping: 12, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      // Pull toward mouse
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      // Snap back
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
export default Magnetic;
