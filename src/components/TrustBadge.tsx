import React from 'react';
import { motion } from 'framer-motion';

export const TrustBadge = () => {
  return (
    <motion.a
      href="https://t.me/flutterflow_rus"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-accent/10 hover:bg-accent/20 text-accent/70 hover:text-accent text-[10px] px-3 py-1.5 rounded-button z-50 flex items-center gap-2 border border-accent/20 backdrop-blur-md transition-colors"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ 
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="w-1.5 h-1.5 bg-accent/40 rounded-full"></div>
      <span className="font-semibold tracking-widest uppercase">Verified Expert @flutterflow_rus</span>
    </motion.a>
  );
};

export default TrustBadge;
