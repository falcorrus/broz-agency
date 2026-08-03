import React, { useState } from 'react';
import type { Project } from '../data/projects';

interface PortfolioGridProps {
  projects: Project[];
  lang?: 'ru' | 'en';
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects, lang = 'ru' }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'tier1' | 'tier2' | 'tier3'>('all');

  const filterTabs = [
    {
      id: 'all',
      label: lang === 'ru' ? 'Все кейсы' : 'All Cases',
      badge: null
    },
    {
      id: 'tier1',
      label: lang === 'ru' ? 'MVP до $1,000' : 'MVP under $1,000',
      badge: lang === 'ru' ? '⏱ Срок: 48 часов' : '⏱ Timeframe: 48 hours'
    },
    {
      id: 'tier2',
      label: '$1,000 – $5,000',
      badge: lang === 'ru' ? '⏱ Срок: 2–4 недели' : '⏱ Timeframe: 2–4 weeks'
    },
    {
      id: 'tier3',
      label: '$5,000+',
      badge: lang === 'ru' ? '⏱ Срок: до 2 месяцев' : '⏱ Timeframe: up to 2 months'
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.budgetTag === activeTab);

  const activeTabMeta = filterTabs.find(t => t.id === activeTab);

  return (
    <div className="flex flex-col gap-8">
      {/* Filter Tabs & Info Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 border uppercase tracking-wider ${
                  isActive
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/20 font-bold'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-emerald-500/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTabMeta?.badge && (
          <div className="mono-tag text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 animate-fadeIn">
            <span>{activeTabMeta.badge}</span>
          </div>
        )}
      </div>

      {/* Bento Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
        {filteredProjects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group neo-card overflow-hidden flex flex-col relative border border-white/10 hover:border-emerald-500/50 transition-all duration-300 ${
              activeTab === 'all'
                ? project.size === 'large'
                  ? 'md:col-span-2 md:row-span-2'
                  : project.size === 'wide'
                  ? 'md:col-span-2'
                  : 'md:col-span-1'
                : 'md:col-span-1'
            }`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-25 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/70 to-transparent" />
            </div>

            {/* Card Content */}
            <div className="relative z-10 p-8 mt-auto flex flex-col justify-between h-full">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="mono-tag text-emerald-400 font-bold px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs">
                  {project.category}
                </span>
                <span className="font-mono text-slate-500 font-bold text-xs">
                  {project.num}
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold neo-heading text-white mb-2 group-hover:text-emerald-400 transition-colors uppercase">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4 font-normal opacity-90">
                  {project.description}
                </p>

                {/* Actions & Meta Footer */}
                <div className="flex items-center justify-between gap-3 flex-wrap mt-2 pt-2 border-t border-white/5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded text-[11px] font-mono text-slate-300">
                    <span className="text-emerald-400 font-semibold">{lang === 'ru' ? 'Срок:' : 'Timeframe:'}</span>
                    <span>{project.timeframe}</span>
                  </div>

                  <div className="inline-flex items-center gap-2 text-emerald-400 mono-tag font-bold text-xs uppercase tracking-wider">
                    <span>{lang === 'ru' ? 'Открыть кейс' : 'View Case'}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
