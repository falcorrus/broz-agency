import React from 'react';
import { motion } from 'framer-motion';

export const TrustBadge = () => {
  return (
    <motion.a
      href="https://t.me/flutterflow_rus"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-accent text-white text-[11px] px-4 py-2 rounded-button shadow-xl z-50 flex items-center gap-2 border border-white/15 backdrop-blur-md"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: '#7e71ff',
        boxShadow: '0 10px 25px -5px rgba(109, 93, 252, 0.4)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span className="font-medium tracking-wide uppercase">Verified Expert @flutterflow_rus</span>
    </motion.a>
  );
};

export default TrustBadge;
