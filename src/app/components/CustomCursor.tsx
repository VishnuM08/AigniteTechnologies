import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  
  // Single source of truth for mouse pointer coordinates (0 lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const linkEl = target.closest('a');
      const buttonEl = target.closest('button') || target.closest('.cursor-pointer');
      
      if (linkEl) {
        setIsHovered(true);
        const href = linkEl.getAttribute('href') || '';
        const to = linkEl.getAttribute('to') || '';
        
        if (href.includes('play.google.com')) {
          setHoverText("GET APP");
        } else if (href.includes('app') || href.includes('theaignite.app') || to.includes('app')) {
          setHoverText("LAUNCH");
        } else {
          setHoverText("VIEW");
        }
      } else if (buttonEl) {
        setIsHovered(true);
        const classStr = buttonEl.className || '';
        if (classStr.includes('faq') || classStr.includes('card')) {
          setHoverText("EXPAND");
        } else {
          setHoverText("SELECT");
        }
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Figma Pointer & Name Badge - Instant 0 lag unit */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-start -translate-x-[2px] -translate-y-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Figma Pointer SVG Arrow */}
        <svg 
          width="18" 
          height="22" 
          viewBox="0 0 14 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <path
            d="M 0 0 L 12 12 L 6.5 12 L 9.5 18.5 L 7.5 19.5 L 4.5 13 L 0 17.5 Z"
            fill="#0071e3"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Name/Action Badge - Springs into view ONLY on hover */}
        <motion.div
          className="px-2 py-0.5 rounded text-[10px] font-bold text-white bg-[#0071e3] shadow-md whitespace-nowrap uppercase tracking-wider select-none border border-white/20"
          style={{
            originX: 0,
            originY: 0,
            x: 12,
            y: 14,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
            backgroundColor: isHovered ? "#38bdf8" : "#0071e3",
          }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
        >
          {hoverText}
        </motion.div>
      </motion.div>
    </>
  );
}
export default CustomCursor;
