import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-white dark:bg-[#1a1a1a] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <h1 
              className="text-[#1a1a1a] dark:text-white"
              style={{ 
                fontSize: '2.5rem', 
                fontWeight: 600, 
                letterSpacing: '-0.02em' 
              }}
            >
              Aignite
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
