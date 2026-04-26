import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Проектирование",
    description: "Мы практики. Говорим с бизнесом на одном языке. Не просто рисуем схемы, а консультируем и помогаем найти оптимальный путь.",
    details: ["Архитектурный проект", "Логика процессов", "Технологический стек"]
  },
  {
    number: "02",
    title: "AI-Дизайн",
    description: "Быстрое прототипирование интерфейса с помощью AI. От идеи до визуального воплощения за считанные часы.",
    details: ["Прототипирование", "Интерактивные макеты", "Визуальный код"]
  },
  {
    number: "03",
    title: "Разработка",
    description: "Подбираем современный стек под конкретную задачу. Чистый код, масштабируемость и высокая производительность.",
    details: ["Промышленный стандарт", "Масштабируемость", "Чистая архитектура"]
  },
  {
    number: "04",
    title: "Автоматизация",
    description: "AI-обработка данных, кастомные скрипты, n8n и серверные задачи. Продукт начинает работать на ваш бизнес 24/7.",
    details: ["Автоматизация потоков", "AI-Агенты", "Автономные операции"]
  }
];

export default function ProcessCards() {
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
            hoveredIdx === idx ? 'border-accent/60 bg-accent/[0.03] shadow-[0_0_40px_-15px_rgba(14,165,233,0.2)]' : 'border-white/5'
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-accent uppercase tracking-[0.3em] font-bold mb-1">Этап {step.number}</span>
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
