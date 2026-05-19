import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Check local storage first
    const savedTheme = localStorage.getItem("theme");

    // 2. Check system preference as fallback
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    if (savedTheme === "dark") {
      setIsDark(true);
    } else if (savedTheme === "light") {
      setIsDark(false);
    } else {
      setIsDark(darkModeQuery.matches);
    }

    // Optional: listen for system changes if no explicit user preference
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
      }
    };
    darkModeQuery.addEventListener("change", handler);
    return () => darkModeQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // Don't modify DOM until initial state is computed
    if (isDark === null) return;

    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const doc = document as any;
    const isAppearanceTransition =
      doc.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
      setIsDark(!isDark);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setIsDark(!isDark);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 450,
          easing: 'ease-out',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      );
    });
  };

  if (isDark === null) return null; // Avoid flicker during hydration

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-8 left-8 p-4 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] rounded-full shadow-lg transition-colors z-[10000]"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}

