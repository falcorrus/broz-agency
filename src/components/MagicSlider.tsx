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
            className="absolute inset-0 bg-[#0f1117] backdrop-blur-[4px]"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden text-white font-sans">
              <div className="w-full max-w-2xl flex flex-col items-center gap-6 scale-[0.7] sm:scale-90 md:scale-100 transition-transform duration-500">
                
                {/* RAG-online Header */}
                <h1 className="text-3xl font-bold tracking-tight">RAG-online</h1>

                {/* Search Bar */}
                <div className="w-full bg-[#161b22] border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between shadow-lg">
                  <span className="text-gray-300 font-medium text-lg">сколько стоит</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-xl">✕</span>
                    <div className="w-10 h-10 bg-[#5c5cfc] rounded-lg flex items-center justify-center shadow-lg shadow-accent/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Quick Questions Chips */}
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="flex flex-wrap justify-center gap-3">
                    <div className="px-4 py-2 bg-[#161b22]/50 border border-white/5 rounded-full text-[11px] text-gray-400">Где хранятся мои данные в CoinLover?</div>
                    <div className="px-4 py-2 bg-[#161b22]/50 border border-white/5 rounded-full text-[11px] text-gray-400">Как мне зарегистрироваться в CoinLover?</div>
                  </div>
                  <div className="px-4 py-2 bg-[#161b22]/50 border border-white/5 rounded-full text-[11px] text-gray-400">Сколько стоит подписка на CoinLover после периода тестирования?</div>
                </div>

                {/* AI Response Card */}
                <div className="w-full bg-[#161b22]/80 border border-white/10 rounded-2xl p-8 relative shadow-2xl">
                  <div className="space-y-6 text-[13px] text-gray-200 leading-relaxed">
                    <p>Для всех пользователей, подключившихся во время периода тестирования, использование приложения бесплатно навсегда. Обычная стоимость подписки составит 10 USD в год.</p>
                    <p>Для вопросов: telegram <span className="text-accent">@argodon</span>, +5548992012727</p>
                  </div>
                  <div className="absolute bottom-4 right-4 p-2 bg-white/5 rounded-lg border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col items-center gap-4 mt-2">
                  <div className="px-6 py-2.5 bg-[#161b22] border border-white/10 rounded-xl text-[12px] font-medium text-gray-300 cursor-pointer hover:border-accent/50 transition-colors">
                    Создайте свой RAG в 2 клика
                  </div>
                  <div className="text-[10px] text-gray-600 tracking-widest uppercase">
                    made in <span className="text-gray-400 font-bold">Broz studio</span>
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
            Выход: AI-система
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicSlider;
