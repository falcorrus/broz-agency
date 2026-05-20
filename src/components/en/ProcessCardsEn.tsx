import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Product Architecture",
    description: "We are practitioners. We speak the same language as your business. We don't just draw diagrams; we consult and help find the most optimal path forward.",
    details: ["System Architecture", "Process Logic", "Tech Stack"]
  },
  {
    number: "02",
    title: "AI-Driven Design",
    description: "Rapid interface prototyping powered by AI. Transform a raw idea into a highly polished visual execution in a matter of hours.",
    details: ["Prototyping", "Interactive Mockups", "Visual Code"]
  },
  {
    number: "03",
    title: "Software Engineering",
    description: "We select a modern, state-of-the-art tech stack matching your specific goals. Clean code, ultimate scalability, and top-tier performance.",
    details: ["Industrial Standard", "Scalability", "Clean Architecture"]
  },
  {
    number: "04",
    title: "Automation & AI",
    description: "AI data processing, custom backend scripts, n8n workflows, and server-side automation. The product starts working for your business 24/7.",
    details: ["Workflow Automation", "AI Agents", "Autonomous Operations"]
  }
];

export default function ProcessCardsEn() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          layout
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`glass-panel p-8 rounded-container cursor-default transition-all duration-500 relative overflow-hidden group ${
            hoveredIdx === idx ? 'border-accent/60 bg-accent/[0.03] shadow-[0_0_40px_-15px_rgba(124,58,237,0.2)]' : 'border-white/5'
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-accent uppercase tracking-[0.3em] font-bold mb-1">Stage {step.number}</span>
              <h3 className="text-3xl font-heading font-bold text-white group-hover:text-accent transition-colors">
                {step.title}
              </h3>
            </div>
            <span className="text-4xl font-heading font-black text-slate-800/50 group-hover:text-accent/10 transition-colors">{step.number}</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">
            {step.description}
          </p>

          <AnimatePresence>
            {hoveredIdx === idx && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="pt-4 border-t border-white/5"
              >
                <div className="flex flex-wrap gap-2">
                  {step.details.map((detail, dIdx) => (
                    <span key={dIdx} className="px-3 py-1 bg-accent/5 border border-accent/20 rounded-full text-[9px] uppercase tracking-widest text-accent font-bold">
                      {detail}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Progress Indicator */}
          <div className="absolute bottom-0 left-0 h-1 bg-accent/20 w-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: hoveredIdx === idx ? '100%' : '0%' }}
              className="h-full bg-accent"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
