import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(true);

  // Motion values for raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast spring for the inner dot (feels responsive and exactly on target)
  const dotSpringConfig = { damping: 35, stiffness: 700, mass: 0.1 };
  const dotXSpring = useSpring(cursorX, dotSpringConfig);
  const dotYSpring = useSpring(cursorY, dotSpringConfig);

  // Smooth, fluid spring for the outer trailing ring (feels premium and weighty)
  const ringSpringConfig = { damping: 25, stiffness: 200, mass: 0.4 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only devices to disable custom cursor on mobile
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    setIsTouchDevice(isMobile);

    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      // Hardware-accelerated throttling to maintain 60fps even on constrained CPUs (Zscaler)
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer");

      setCursorVariant(isInteractive ? "pointer" : "default");
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice || !isVisible) return null;

  const isPointer = cursorVariant === "pointer";

  return (
    <>
      {/* Outer Premium Glassmorphism Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center will-change-transform"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-[2px]"
          animate={{
            width: isPointer ? 64 : 40,
            height: isPointer ? 64 : 40,
            opacity: isPointer ? 0.9 : 0.6,
            borderWidth: isPointer ? "1px" : "1.5px",
            backgroundColor: isPointer
              ? "rgba(255, 255, 255, 0.05)"
              : "transparent",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          animate={{
            width: isPointer ? 4 : 8,
            height: isPointer ? 4 : 8,
            opacity: isPointer ? 1 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>
    </>
  );
}
