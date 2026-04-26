import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

// Constants for interactive polish
const SPRING_CONFIG = { damping: 30, stiffness: 300, mass: 0.5 };
const INITIAL_PERCENTAGE = 50;

const MagicSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVal, setCurrentVal] = useState(INITIAL_PERCENTAGE);
  
  // Percentage-based motion values for responsiveness (0 to 100)
  const percentage = useMotionValue(INITIAL_PERCENTAGE);
  const smoothPercentage = useSpring(percentage, SPRING_CONFIG);
  
  // Sync state for accessibility attributes
  useMotionValueEvent(percentage, "change", (latest) => {
    setCurrentVal(Math.round(latest));
  });

  // Convert percentage to inset value for clip-path reveal
  const clipPath = useTransform(smoothPercentage, (p) => `inset(0 0 0 ${p}%)`);
  
  // Convert percentage to string for CSS left property
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 italic uppercase tracking-tight">
            Магия <span className="text-accent not-italic">автоматизации</span>.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            От простого текстового запроса до готовой <br className="hidden md:block" />
            интеллектуальной системы за 24 часа.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-video w-full rounded-container border border-white/10 bg-surface overflow-hidden shadow-2xl group cursor-col-resize select-none"
          role="slider"
          aria-label="Слайдер сравнения промпта и интерфейса"
          aria-valuenow={currentVal}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Background Layer: The Prompt (Visible on the left) */}
          <div className="absolute inset-0 flex items-center justify-center bg-surface p-8 md:p-20">
            <div className="max-w-md w-full space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              </div>
              <div className="font-mono text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
                <span className="text-accent">заявка:</span> хочу, чтоб и мобильное приложение было и в WEB открывалось. Чтоб был маркетплейс, как Wildberries, услуги как в profi.ru, и новости сами собирались из каналов Telegram.
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-5 bg-accent align-middle ml-1"
                />
              </div>
            </div>
          </div>

          {/* Foreground Layer: The UI (Revealed based on slider position) */}
          <motion.div 
            style={{ clipPath }}
            className="absolute inset-0 bg-[#F4F7FA] backdrop-blur-[4px]"
          >
            <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-8 overflow-hidden text-black font-sans">
              {/* BAO Mobile UI Mockup */}
              <div className="w-[320px] h-[580px] bg-white border-[8px] border-black rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative scale-[0.75] sm:scale-90 md:scale-100 transition-transform duration-500">
                {/* Header */}
                <div className="pt-8 px-6 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-blue-600 font-black text-2xl italic">bao</div>
                    <div className="text-[10px] text-gray-400 font-medium">USDT = 1469</div>
                  </div>
                  <div className="flex items-center gap-4 text-blue-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  </div>
                </div>

                {/* Main Nav */}
                <div className="flex justify-around px-2 mb-4">
                  {['Услуги', 'Магазины', 'Товары'].map(item => (
                    <div key={item} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50">
                      <div className="w-3 h-3 bg-blue-600 rounded-sm" />
                      <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-10">
                  {/* Banner */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">🏃</div>
                    <div className="text-blue-600 font-black text-lg">ВСЕ УСЛУГИ</div>
                  </div>

                  {/* Events */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <h3 className="font-bold text-lg">События <span className="text-blue-600 font-normal">все</span></h3>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="aspect-[4/3] bg-blue-100 rounded-xl relative overflow-hidden">
                          <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-[9px] font-bold">25 мар.</div>
                          <div className="w-full h-full flex items-center justify-center text-2xl">🧠</div>
                        </div>
                        <p className="text-[10px] font-bold leading-tight line-clamp-2">Квиз для англоговорящих эк...</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="aspect-[4/3] bg-black rounded-xl relative overflow-hidden">
                          <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-[9px] font-bold">26 мар.</div>
                          <div className="w-full h-full flex items-center justify-center text-xs font-black text-white">IMbusiness</div>
                        </div>
                        <p className="text-[10px] font-bold leading-tight line-clamp-2">Бизнес-разбор в подар...</p>
                      </div>
                    </div>
                  </div>

                  {/* Shops */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <h3 className="font-bold text-lg">Магазины <span className="text-blue-600 font-normal">все</span></h3>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center text-xs text-center p-2 text-white leading-none">cafe y mas</div>
                        <p className="text-[9px] font-bold">Бразильский кофе</p>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-2xl">🌿</div>
                        <p className="text-[9px] font-bold">Pepino Pick</p>
                      </div>
                    </div>
                  </div>

                  {/* News Argentina */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <h3 className="font-bold text-lg">Новости Аргентины <span className="text-blue-600 font-normal">все</span></h3>
                    </div>
                    <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                      <p className="text-[10px] leading-snug font-medium">AFIP объявила о поднятии планки лимитов по доходам монотрибуто.</p>
                    </div>
                  </div>
                </div>

                {/* Footer attribution */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <div className="text-[8px] text-gray-400 tracking-[0.2em] uppercase">
                    сделано в <span className="font-bold">Broz studio</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Draggable Divider Line */}
          <motion.div
            style={{ left: dividerLeft }}
            onPan={handlePan}
            className="absolute top-0 bottom-0 w-1 bg-accent z-50 cursor-col-resize group-hover:bg-accent-glow -ml-0.5"
          >
            {/* Larger hit area for touch devices */}
            <div className="absolute top-0 bottom-0 -left-4 -right-4 cursor-col-resize z-10" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full border-4 border-background flex items-center justify-center shadow-2xl z-20 touch-none">
              <div className="flex gap-1">
                <div className="w-1.5 h-3 md:h-4 bg-white/80 rounded-full" />
                <div className="w-1.5 h-3 md:h-4 bg-white/80 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Labels (Responsive visibility/size) */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-40 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[8px] sm:text-[10px] uppercase tracking-widest text-gray-400 border border-white/5 pointer-events-none">
            Вход: Заявка
          </div>
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-40 px-2 py-1 bg-accent/20 backdrop-blur-md rounded text-[8px] sm:text-[10px] uppercase tracking-widest text-accent-glow border border-accent/20 pointer-events-none">
            Мобильное + Веб
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicSlider;
