---
title: "02. Архитектура и Стек"
created: 2026-05-02
---

# 🏗 Архитектура и Стек технологий

Проект построен по принципу "Speed & Performance first".

## 🛠 Технологический стек
- **Framework:** [Astro 6](https://astro.build/) (SSG для максимального SEO и скорости).
- **Library:** [React 19](https://react.dev/) (для сложных интерактивных компонентов).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [Vanilla CSS].
- **Animations:** [Framer Motion](https://www.framer.com/motion/).
- **Icons:** Lucide React.

## 🎨 Дизайн-система (Linear Style)
- **Background:** `#050505`
- **Accent:** `#6d5dfc` (Purple)
- **Rounding:** 28px (блоки) / 14px (кнопки/элементы).
- **Fonts:** Bodoni Moda (Заголовки), Jost (Текст).

## 📂 Структура папок
- `src/components/` — Все UI-компоненты.
    - `Hero.astro` — Главный оффер.
    - `MagicSlider.tsx` — Демонстрация скорости "Заявка → Решение".
    - `Portfolio.astro` — Витрина кейсов.
    - `ProcessCards.tsx` — Этапы работы.
- `src/layouts/` — Общие шаблоны страниц.
- `public/` — Статические ассеты (изображения, фавикон).
- `nginx.conf` — Конфигурация веб-сервера.
- `Dockerfile` & `docker-compose.yml` — Контейнеризация.
