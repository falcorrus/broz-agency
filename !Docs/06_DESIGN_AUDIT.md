# Дизайн-аудит broz.agency

## Текущий стек
**Astro + React (TSX) + Tailwind v4 | Шрифты: Bodoni Moda + Jost | Цвет: Slate-950 + Sky-500**

---

## Оценка текущего дизайна

### ✅ Что работает хорошо

| Компонент | Плюс |
|-----------|------|
| **Header** | Floating navbar с blur-эффектом при скролле — современно |
| **Hero** | Анимированный WaveText с alternating texts — engaging |
| **ProcessCards** | Framer Motion hover с expand details — интерактивно |
| **About** | Bento grid с 4 ячейками — хороший информационный layout |
| **Portfolio** | Bento-grid кейсы с разными размерами — правильная структура |
| **Global CSS** | reveal-анимации, custom scrollbar, glass-panel utility |

### ❌ Критические проблемы

| Приоритет | Проблема | Где | Почему важно |
|-----------|----------|-----|--------------|
| 🔴 **P1** | **Конфликт шрифтов**: Bodoni Moda serif italic на заголовках + Jost sans-serif — плохое сочетание для IT-агентства | Весь сайт | Bodoni — fashion/editorial. Для tech-агентства нужен геометрический гротеск |
| 🔴 **P1** | **Accent Sky-500 (#0ea5e9) — слишком «корпоративный»** | global.css | Выглядит как Bootstrap-синий. Агентства-лидеры используют фиолетовый, чисто белый или amber |
| 🔴 **P1** | **Contact-секция без реального контакта** | Contact.astro | Только Telegram/WhatsApp кнопки — нет формы, нет email. Потеря лидов |
| 🟡 **P2** | **Portfolio изображения** = Unsplash stock photos (grayscale opacity-20) | Portfolio.astro | Не показывают реальный продукт. Почти невидимы. Нет доверия |
| 🟡 **P2** | **Мобильное меню** = только `<button>` без функциональности | Header.astro | Нет mobile nav — UX поломан на мобиле |
| 🟡 **P2** | **TrustBadge** компонент торчит вне layout | index.astro | Нет контекста где он появляется |
| 🟠 **P3** | `font-size: text-xs` для feature list в Pricing | Pricing.astro | 12px — ниже минимума. Нечитаемо |
| 🟠 **P3** | Смешение языков: "Explore Module", "Module 01", "Status: Autonomous" + русский текст | Portfolio, Pricing | Непоследовательно |
| 🟠 **P3** | `animate-ping` dot в Hero — дешёво выглядит | Hero.astro | Это "online status" паттерн, не для агентства |
| 🟠 **P3** | `scale-105` на highlighted pricing card | Pricing.astro | Нарушает сетку, выглядит дёшево |

---

## 3 Концепции редизайна

### Концепция A: **Exaggerated Minimalism** (рекомендуется)

![Концепция A — Minimal](/Users/eugene/MyProjects/broz.agency/!Docs/images/concept_a_minimalism_1779293782947.png)
> _Линейный стиль. Чёрный на белом. Только текст._

**Референсы:** Linear.app, Vercel, Resend, Liveblocks

```
Палитра:
  Background: #050505
  Text: #FAFAFA  
  Accent: #6d5dfc  (твой Linear-фиолетовый из SOUL.md!)
  Surface: #0F0F0F
  Border: #1a1a1a

Шрифты:
  Heading: "Geist" (Vercel) или "DM Sans" 800 weight
  Body: "Inter" 400/500
  Mono: "Geist Mono" для кодовых меток

Эффекты:
  - Нет blur-стеклышек в героях (только где уместно)
  - Огромная типографика: clamp(4rem, 10vw, 10rem)
  - letter-spacing: -0.04em на заголовках
  - Горизонтальная линия-разделитель вместо отступов
  - Hover: простой border-bottom или background-color
```

**Структура Hero (новая):**
```
[Брендбар]                            [Связаться →]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Превращаем
задачи
в прибыль.

────────────────────────────────────────────────
IT-решения для тех, кто считает деньги.    [→]
```

---

### Концепция B: **Dark Glassmorphism Premium**

![Концепция B — Glassmorphism](/Users/eugene/MyProjects/broz.agency/!Docs/images/concept_b_glassmorphism_1779293799083.png)
> _Твой текущий стиль, но доведённый до уровня linear.app/mercury_

```
Палитра:
  Background: #000000  (OLED black, не Slate-950)
  Accent: #7C3AED  (violet-600, не sky)
  Surface: rgba(255,255,255,0.03)
  Border: rgba(255,255,255,0.08)
  Glow: rgba(124,58,237,0.15)

Шрифты:
  Heading: "Satoshi" или "Cabinet Grotesk" 700/900
  Body: "General Sans" 400/500

Ключевые изменения:
  - Фон #000000 вместо #020617 — глубже, OLED-friendl
  - Violet вместо Sky — Premium агентство, не corporat
  - Border opacity повысить до 0.1-0.12
  - Glow: 0 0 60px rgba(124,58,237,0.2) вместо sky
```

---

### Концепция C: **Dark Brutalism** (для дерзких)

![Концепция C — Brutalism](/Users/eugene/MyProjects/broz.agency/!Docs/images/concept_c_brutalism_1779293810995.png)
> _Против всех трендов. Запоминается._

```
Палитра:
  Background: #0A0A0A
  Text: #FFFFFF
  Accent: #FF4D00  (оранжевый, как Figma)
  Grid: 1px #222 линии

Шрифты:
  All: "Space Grotesk" 700-900
  Mono labels: "Space Mono"

Ключевые признаки:
  - border-radius: 0 везде
  - Видимая grid-сетка на фоне
  - Большие номера секций (01, 02, 03) как структура
  - Hover = мгновенный color invert
  - Явные thick borders (2px)
```

---

## Конкретные правки кода

### 1. global.css — Замена палитры и шрифтов (Концепция A)

```css
/* БЫЛО */
--color-accent: #0ea5e9;  /* Sky-500 */
--font-heading: "Bodoni Moda", serif;
--font-body: "Jost", sans-serif;

/* СТАЛО */
--color-accent: #6d5dfc;  /* Linear violet */
--color-accent-glow: #8b7eff;
--font-heading: "DM Sans", sans-serif;
--font-body: "Inter", sans-serif;

/* Добавить */
--color-background: #050505;
--color-surface: #0a0a0a;
--color-border-primary: rgba(255,255,255,0.07);
```

### 2. Hero.astro — Убрать animate-ping, увеличить типографику

```html
<!-- БЫЛО: дешёвый online-dot -->
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success"></span>

<!-- СТАЛО: просто текстовый badge -->
<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-10">
  Engineering v2.0
</div>

<!-- БЫЛО: italic serif -->
<h1 class="text-6xl md:text-8xl lg:text-9xl font-heading font-medium tracking-tight mb-8 leading-[0.9] italic">

<!-- СТАЛО: геометрический гротеск, -tracking -->
<h1 class="text-7xl md:text-[10rem] lg:text-[13rem] font-heading font-black tracking-[-0.04em] mb-8 leading-[0.85]">
```

### 3. Pricing.astro — Убрать scale-105, исправить font-size

```html
<!-- БЫЛО: выпирающая карточка -->
{ "border-accent/40 shadow-[...] scale-105 z-10": plan.highlight }

<!-- СТАЛО: только усиленная рамка, без scale -->
{ "border-accent/40 shadow-[0_0_60px_-20px_rgba(109,93,252,0.4)]": plan.highlight }

<!-- БЫЛО: text-xs для features -->
<li class="flex items-start gap-3 text-xs text-slate-400">

<!-- СТАЛО: минимум 14px -->
<li class="flex items-start gap-3 text-sm text-slate-400">
```

### 4. Header.astro — Мобильное меню

```html
<!-- Добавить mobile nav overlay -->
<div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex-col items-center justify-center gap-8 md:hidden">
  <!-- nav items -->
</div>

<script>
  const btn = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  btn.addEventListener('click', () => menu.classList.toggle('flex'));
</script>
```

### 5. Contact.astro — Добавить реальную форму

```html
<!-- Вместо только кнопок — минимальная форма -->
<form class="grid gap-4 max-w-md mx-auto text-left mt-12">
  <input 
    type="text" 
    placeholder="Ваше имя" 
    class="w-full px-5 py-4 bg-surface border border-border-primary rounded-button text-white placeholder-slate-600 focus:border-accent/50 outline-none transition-colors text-sm"
  />
  <input 
    type="text" 
    placeholder="Telegram / Email" 
    class="..." 
  />
  <textarea 
    placeholder="Расскажите о проекте..." 
    rows="3"
    class="..."
  ></textarea>
  <button type="submit" class="w-full py-4 bg-accent text-white font-bold rounded-button uppercase tracking-widest text-[11px]">
    Отправить
  </button>
</form>
```

---

## Приоритизированный план

```
Неделя 1 (P1 — критично):
  [ ] Заменить шрифты: Bodoni → DM Sans + Inter
  [ ] Заменить акцент: Sky-500 → Linear #6d5dfc  
  [ ] Добавить мобильное меню
  [ ] Добавить форму в Contact

Неделя 2 (P2 — важно):
  [ ] Portfolio: реальные скриншоты вместо stock
  [ ] Убрать scale-105 с pricing card
  [ ] Увеличить font-size в feature списках
  [ ] Унифицировать язык (всё на русском или английском)

Неделя 3 (P3 — полировка):
  [ ] Hero: убрать animate-ping, увеличить типографику
  [ ] About: hero числа с анимацией count-up
  [ ] Добавить реальный social proof (отзывы/лого клиентов)
  [ ] OG Image для соцсетей
```

---

## Финальная оценка (из 10)

| Категория | Сейчас | После P1 | После P2+P3 |
|-----------|--------|----------|-------------|
| Типографика | 5/10 | 8/10 | 9/10 |
| Цвет/Палитра | 6/10 | 8/10 | 9/10 |
| UX/Взаимодействие | 6/10 | 7/10 | 9/10 |
| Конверсия | 4/10 | 7/10 | 8/10 |
| Мобайл | 3/10 | 7/10 | 9/10 |
| **Итого** | **5/10** | **7.4/10** | **8.8/10** |
