import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";

export function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(true);

  // Motion values for raw mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast spring for the inner dot
  const dotSpringConfig = { damping: 30, stiffness: 600, mass: 0.1 };
  const dotXSpring = useSpring(cursorX, dotSpringConfig);
  const dotYSpring = useSpring(cursorY, dotSpringConfig);

  // Slightly slower, highly fluid spring for the outer geometric shape
  const ringSpringConfig = { damping: 20, stiffness: 150, mass: 0.3 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  // Calculate rotation based on velocity/movement to make it feel alive
  const rotation = useTransform(
    [ringXSpring, ringYSpring],
    ([x, y]: number[]) => {
      // Create a subtle continuous rotation based on position
      // The shape will slowly rotate as it moves across the screen
      return (x + y) * 0.15;
    },
  );

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    setIsTouchDevice(isMobile);

    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
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
      {/* Outer Sleek Ring */}
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
          className={`rounded-full border transition-colors duration-300 ${
            isPointer
              ? "dark:border-black border-white dark:bg-white bg-black"
              : "dark:border-white border-black"
          }`}
          animate={{
            width: isPointer ? 50 : 36,
            height: isPointer ? 50 : 36,
            opacity: isPointer ? 0.15 : 0.2,
            borderWidth: isPointer ? "1px" : "1.5px",
            scale: isPointer ? 1.2 : 1,
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
          className={`rounded-full transition-colors duration-300 drop-shadow-sm ${
            isPointer ? "dark:bg-black bg-white" : "dark:bg-white bg-black"
          }`}
          animate={{
            width: isPointer ? 6 : 8,
            height: isPointer ? 6 : 8,
            opacity: isPointer ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
        />
      </motion.div>
    </>
  );
}
