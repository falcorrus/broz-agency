import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaveTextProps {
  texts: string[];
}

export default function WaveText({ texts }: WaveTextProps) {
  const [index, setIndex] = useState(0);
  const textKey = texts.join('|');

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [textKey]);

  return (
    <div className="relative inline-block py-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="inline-block text-gradient-emerald font-extrabold uppercase not-italic leading-none"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
