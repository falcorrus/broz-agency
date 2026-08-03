// src/data/projects.ts

export interface Project {
  num: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  size?: 'large' | 'wide' | 'normal';
  budgetTag: 'tier1' | 'tier2' | 'tier3';
  budgetText: string;
  timeframe: string;
}

export const projectsRu: Project[] = [
  {
    num: "01",
    title: "CoinLover",
    description: "Автономный трекер личных финансов. Локальное шифрование данных и real-time аналитика.",
    category: "Mobile / Fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    link: "https://coinlover.ru/landing",
    size: "large",
    budgetTag: "tier3",
    budgetText: "$5,000+",
    timeframe: "4 недели"
  },
  {
    num: "02",
    title: "FloripaGuru",
    description: "Платформа релокации по Флорианополису: интерактивные карты районов, гиды по CPF и пешим маршрутам.",
    category: "Web Platform / SEO",
    image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=800",
    link: "https://floripa.guru",
    size: "normal",
    budgetTag: "tier3",
    budgetText: "$5,000+",
    timeframe: "3 недели"
  },
  {
    num: "03",
    title: "MyeSIM",
    description: "Международная связь для 150+ стран с мгновенной активацией.",
    category: "Telecom / eSIM",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    link: "https://myesim.me/",
    size: "normal",
    budgetTag: "tier2",
    budgetText: "$1,000 – $5,000",
    timeframe: "2 недели"
  },
  {
    num: "04",
    title: "Baonline",
    description: "Децентрализованный хаб релокации: каталог сервисов и синхронизация в реальном времени.",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    link: "https://bao.reloto.ru",
    size: "normal",
    budgetTag: "tier2",
    budgetText: "$1,000 – $5,000",
    timeframe: "3 недели"
  },
  {
    num: "05",
    title: "NewAddress",
    description: "MVP-система управления real-estate активами без посредников.",
    category: "PropTech",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    link: "https://newaddress.glide.page/",
    size: "normal",
    budgetTag: "tier1",
    budgetText: "до $1,000",
    timeframe: "48 часов"
  },
  {
    num: "06",
    title: "easyFAQ.online",
    description: "AI-автоответчик для автоматизации сервиса и клиентских коммуникаций в «одну кнопку».",
    category: "AI / Automation",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    link: "https://easyfaq.online",
    size: "wide",
    budgetTag: "tier1",
    budgetText: "до $1,000",
    timeframe: "1 неделя"
  },
  {
    num: "07",
    title: "RAG Search",
    description: "Интеллектуальный векторный поиск по корпоративным архивам документов.",
    category: "AI Tooling",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    link: "https://search.reloto.ru/",
    size: "normal",
    budgetTag: "tier2",
    budgetText: "$1,000 – $5,000",
    timeframe: "2 недели"
  }
];

export const projectsEn: Project[] = [
  {
    num: "01",
    title: "CoinLover",
    description: "Autonomous personal finance tracker. Local data encryption & real-time analytics.",
    category: "Mobile / Fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    link: "https://coinlover.ru/landing",
    size: "large",
    budgetTag: "tier3",
    budgetText: "$5,000+",
    timeframe: "4 weeks"
  },
  {
    num: "02",
    title: "FloripaGuru",
    description: "Relocation portal for Florianópolis: interactive district maps, banking guides & trail routes.",
    category: "Web Platform / SEO",
    image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=800",
    link: "https://floripa.guru",
    size: "normal",
    budgetTag: "tier3",
    budgetText: "$5,000+",
    timeframe: "3 weeks"
  },
  {
    num: "03",
    title: "MyeSIM",
    description: "Global mobile connectivity for 150+ countries with instant activation.",
    category: "Telecom / eSIM",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    link: "https://myesim.me/",
    size: "normal",
    budgetTag: "tier2",
    budgetText: "$1,000 – $5,000",
    timeframe: "2 weeks"
  },
  {
    num: "04",
    title: "Baonline",
    description: "Decentralized expat relocation hub: real-time business directory & service sync.",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    link: "https://bao.reloto.ru",
    size: "normal",
    budgetTag: "tier2",
    budgetText: "$1,000 – $5,000",
    timeframe: "3 weeks"
  },
  {
    num: "05",
    title: "NewAddress",
    description: "MVP system for direct peer-to-peer real estate asset management.",
    category: "PropTech",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    link: "https://newaddress.glide.page/",
    size: "normal",
    budgetTag: "tier1",
    budgetText: "up to $1,000",
    timeframe: "48 hours"
  },
  {
    num: "06",
    title: "easyFAQ.online",
    description: "AI conversational responder for automated customer support & 1-click workflows.",
    category: "AI / Automation",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    link: "https://easyfaq.online",
    size: "wide",
    budgetTag: "tier1",
    budgetText: "up to $1,000",
    timeframe: "1 week"
  },
  {
    num: "07",
    title: "RAG Search",
    description: "High-performance vector document search over private enterprise archives.",
    category: "AI Tooling",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    link: "https://search.reloto.ru/",
    size: "normal",
    budgetTag: "tier2",
    budgetText: "$1,000 – $5,000",
    timeframe: "2 weeks"
  }
];
