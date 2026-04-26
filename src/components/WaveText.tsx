import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaveTextProps {
  texts: string[];
}

export default function WaveText({ texts }: WaveTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [texts]);

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
          className="inline-block text-gradient font-bold not-italic leading-none"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
      
      {/* Liquid Wave Effect - Soft Glow instead of square box */}
      <motion.div
        key={`glow-${index}`}
        initial={{ left: '-20%', opacity: 0 }}
        animate={{ left: '120%', opacity: [0, 1, 0] }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut",
          delay: 0.2
        }}
        className="absolute top-0 bottom-0 w-32 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
}
