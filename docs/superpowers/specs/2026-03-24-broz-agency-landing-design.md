# Design Doc: broz.agency Landing Page

**Date:** 2026-03-24
**Author:** gemini CLI
**Status:** Draft (Approved by User)

## 🎯 1. Overview
Создание персонального сайта-визитки для Евгения Киршина (Broz), Full Cycle Product Engineer. Сайт должен позиционировать владельца как эксперта высшего уровня, способного быстро (MVP за 24 часа) превращать бизнес-задачи в прибыльные IT-решения.

## 🎨 2. Design Philosophy (Product Dynamic)
Стиль, сочетающий инженерную строгость и продуктовую эстетику.
- **Visual Style:** Linear-inspired. Тёмная тема, плавные градиенты, интерактивная обратная связь.
- **Colors:**
    - Background: `#050505`
    - Accent: `#6d5dfc` (с эффектом glow)
    - Surface: `#0d0d0d` (с границами `#1a1a1a`)
- **Typography:** `Inter` (Sans-serif). Использование жирных начертаний для офферов.
- **Geometry:** 28px rounding для блоков, 14px для внутренних элементов.

## 🧱 3. Architecture & Blocks

### Block 1: Hero (Results Oriented)
- **Headline:** «Превращаю задачи в прибыль.»
- **Subheadline:** «Создаю IT-решения, которые экономят ресурсы и масштабируют ваш бизнес.»
- **Accent:** Текст «в прибыль» выделен акцентным цветом или градиентом.

### Block 2: Interactive Proof (Slider "Prompt to UI")
- **Concept:** Интерактивный слайдер или анимация «было/стало».
- **Content:** Слева — текстовое ТЗ (Input), справа — финализированный UI (Output).
- **Goal:** Наглядная демонстрация скорости и эффективности работы с AI-инструментами.

### Block 3: Portfolio (Visual Showcase)
- **Format:** Крупные карточки с сочными скриншотами интерфейсов.
- **Projects:**
    - CoinLover (Finance)
    - Reloto AI (SMB/AI)
    - Baonline (Relocation/Scale)
    - NewAddress (Real Estate)
    - RAG Search (Deep Tech)

### Block 4: Authority & Context
- **Positioning:** Основатель «FlutterFlow Rus».
- **Trust Elements:** Плавающий (Sticky) бейдж: `Verified Expert @flutterflow_rus` (ссылка на t.me/flutterflow_rus).

### Block 5: Interactive CTA (Quick Connect + Status)
- **Status:** Индикатор `● Available for new projects` (пульсирующий зеленый свет).
- **Buttons:** Группа кнопок для связи: Telegram, WhatsApp, Book a call.

## 🛠 4. Tech Stack
- **Framework:** Astro (Static Site Generation - SSG)
- **UI Components:** React (для интерактивных островов: слайдер, CTA)
- **Styling:** Vanilla CSS + Tailwind + Framer Motion
- **Containerization:** Docker (образ `nginx:alpine`)
- **Hosting:** Собственный VPS (Ubuntu)
- **Proxy:** System Nginx + Certbot (SSL)
- **Deployment:** `deploy.sh` (Local build -> Git push -> Remote `docker compose up -d --build`)

## 🐳 5. Infrastructure (Docker)
- **Dockerfile:** Многоэтапная сборка (Node.js для билда, Nginx для раздачи).
- **Docker Compose:** Описание сервиса `broz-agency` с привязкой к внутреннему порту (например, `8020`).
- **Nginx Config (Host):** Проксирование `broz.agency` -> `localhost:8020`.

## ✅ 6. Success Criteria
1. **Performance:** Google Lighthouse Score **100/100**.
2. **Infrastructure:** Полная изоляция в Docker-контейнере.
3. **Deployment:** Деплой одной командой по аналогии с CoinLover.
4. **UX:** Плавная работа интерактивных элементов (Astro Islands).
