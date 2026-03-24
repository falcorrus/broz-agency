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
              <div className="font-mono text-xs sm:text-sm md:text-base space-y-2 text-gray-400">
                <p><span className="text-accent">заявка:</span> устал ловить вопросы клиентов</p>
                <p>в месенджерах. Сделай, чтобы они находили</p>
                <p>ответы на все вопросы в одном месте,</p>
                <p>но могли связаться со мной. И чтобы я мог</p>
                <p>легко обновлять данные.</p>
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
            className="absolute inset-0 bg-gradient-to-br from-accent/15 via-background to-background backdrop-blur-[4px]"
          >
            <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-12 overflow-hidden">
              {/* RAG-like UI Mockup */}
              <div className="w-full h-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden scale-[0.85] sm:scale-100 transition-transform duration-500">
                {/* Top Bar */}
                <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-black/40">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-sm" />
                    <div className="text-[11px] font-bold text-gray-300">Спортклуб Арнольд / AI-ассистент</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-white/5 rounded border border-white/5" />
                    <div className="h-6 w-6 bg-white/10 rounded-full" />
                  </div>
                </div>
                
                <div className="flex-1 flex overflow-hidden">
                  {/* Left Sidebar: Knowledge Sources */}
                  <div className="hidden md:flex flex-col gap-4 w-56 border-r border-white/5 p-4 bg-black/20">
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">База знаний</div>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
                        <div className="w-6 h-6 bg-accent/20 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-accent/40 rounded-sm" />
                        </div>
                        <div className="h-2 w-24 bg-white/10 rounded" />
                      </div>
                    ))}
                    <div className="mt-auto p-3 rounded-lg border border-dashed border-white/10 flex items-center justify-center">
                      <div className="text-[9px] text-gray-500">+ Обновить прайс</div>
                    </div>
                  </div>

                  {/* Main: AI Chat Interface */}
                  <div className="flex-1 flex flex-col p-4 sm:p-6 bg-gradient-to-b from-transparent to-accent/5">
                    <div className="flex-1 space-y-6">
                      {/* User Message */}
                      <div className="flex justify-end">
                        <div className="max-w-[80%] bg-accent/10 border border-accent/20 p-3 rounded-2xl rounded-tr-none text-[11px] text-gray-300">
                          сколько стоит
                        </div>
                      </div>
                      
                      {/* AI Response */}
                      <div className="flex justify-start gap-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold">AI</div>
                        <div className="max-w-[85%] space-y-3">
                          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-[11px] text-gray-400 leading-relaxed">
                            У нас есть одноразовое посещение и ежемесячные абонементы. Уточните у менеджера +55 111 222334
                          </div>
                          {/* Citation dots */}
                          <div className="flex gap-2">
                            <div className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[8px] text-gray-500">Прайс_2026.pdf</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Input Area */}
                    <div className="mt-6 h-12 bg-white/5 border border-white/10 rounded-full flex items-center px-4 gap-3">
                      <div className="h-3 w-full bg-white/5 rounded" />
                      <div className="w-8 h-8 bg-accent rounded-full flex-shrink-0" />
                    </div>
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-accent rounded-full border-4 border-background flex items-center justify-center shadow-xl">
              <div className="flex gap-1">
                <div className="w-1 h-2 sm:h-3 bg-white/80 rounded-full" />
                <div className="w-1 h-2 sm:h-3 bg-white/80 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Labels (Responsive visibility/size) */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-40 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[8px] sm:text-[10px] uppercase tracking-widest text-gray-400 border border-white/5 pointer-events-none">
            Вход: Заявка
          </div>
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-40 px-2 py-1 bg-accent/20 backdrop-blur-md rounded text-[8px] sm:text-[10px] uppercase tracking-widest text-accent-glow border border-accent/20 pointer-events-none">
            Выход: AI-система
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicSlider;
