import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

const SPRING_CONFIG = { damping: 30, stiffness: 300, mass: 0.5 };
const INITIAL_PERCENTAGE = 50;

const MagicSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVal, setCurrentVal] = useState(INITIAL_PERCENTAGE);
  
  const percentage = useMotionValue(INITIAL_PERCENTAGE);
  const smoothPercentage = useSpring(percentage, SPRING_CONFIG);
  
  useMotionValueEvent(percentage, "change", (latest) => {
    setCurrentVal(Math.round(latest));
  });

  const clipPath = useTransform(smoothPercentage, (p) => `inset(0 0 0 ${p}%)`);
  const dividerLeft = useTransform(smoothPercentage, (p) => `${p}%`);

  const handlePan = (event: any, info: any) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = info.point.x - rect.left;
      const p = (x / rect.width) * 100;
      percentage.set(Math.max(0, Math.min(100, p)));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      percentage.set(Math.max(0, percentage.get() - 5));
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      percentage.set(Math.min(100, percentage.get() + 5));
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="mono-tag text-emerald-400 mb-2 font-semibold">[04] AUTOMATION & SPEED</div>
          <h2 className="text-3xl md:text-5xl font-extrabold neo-heading uppercase mb-4 text-white">
            Магия <span className="text-gradient-emerald">Автоматизации</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto font-normal">
            Перетащите слайдер: от обычной бизнес-идеи в чате до готового работающего продукта с монетизацией.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-video w-full rounded-2xl border border-white/10 bg-[#131316] overflow-hidden shadow-2xl group cursor-col-resize select-none"
          role="slider"
          aria-label="Слайдер сравнения идеи и готового интерфейса"
          aria-valuenow={currentVal}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Background Layer: Prompt */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#131316] p-8 md:p-20">
            <div className="max-w-md w-full space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="mono-tag text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">INPUT // PROMPT</span>
              </div>
              <div className="font-mono text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed bg-[#0a0a0c] p-5 rounded-xl border border-white/10">
                <span className="text-emerald-400 font-bold">заявка:</span> хочу, чтобы и мобильное приложение было и в WEB открывалось. Чтоб был маркетплейс, как Wildberries, сервисы как в profi.ru, и автосбор новостей из Telegram.
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-4 bg-emerald-400 align-middle ml-1"
                />
              </div>
            </div>
          </div>

          {/* Foreground Layer: Product UI */}
          <motion.div 
            style={{ clipPath }}
            className="absolute inset-0 bg-[#0f172a]"
          >
            <div className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden">
              <div className="w-[320px] h-[580px] bg-slate-900 border-[6px] border-emerald-500/40 rounded-[36px] shadow-2xl flex flex-col overflow-hidden relative scale-[0.8] sm:scale-95 transition-transform">
                {/* Mock Header */}
                <div className="pt-7 px-5 pb-3 flex items-center justify-between border-b border-white/10 bg-slate-950">
                  <span className="font-mono font-extrabold text-xs text-white uppercase tracking-wider">BAONLINE // APP</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                {/* Mock Content */}
                <div className="p-4 space-y-3 font-sans">
                  <div className="h-28 bg-emerald-500/10 rounded-xl border border-emerald-500/30 p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">ACTIVE WORKFLOW</span>
                    <span className="text-xs font-bold text-white uppercase">Marketplace & Sync Live</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-20 bg-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-slate-400">USERS</span>
                      <span className="text-sm font-bold text-white">12,450+</span>
                    </div>
                    <div className="h-20 bg-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-slate-400">TG FEEDS</span>
                      <span className="text-sm font-bold text-emerald-400">AUTOSYNC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Divider Handle */}
          <motion.div 
            style={{ left: dividerLeft }}
            className="absolute top-0 bottom-0 w-1 bg-emerald-400 cursor-col-resize z-30 shadow-[0_0_15px_#10b981]"
          >
            <motion.div 
              onPan={handlePan}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing text-slate-950 font-mono text-xs font-black"
            >
              ↔
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MagicSlider;
