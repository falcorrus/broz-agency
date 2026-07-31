---
type: "entity"
category: "project"
project: "broz.agency"
---
# План реализации — Английская версия сайта broz.agency

Этот документ описывает шаги по созданию премиальной англоязычной версии сайта `broz.agency` в стиле **"Dark Glassmorphism Premium"** на роуте `/en` с использованием CSS-переменных темы `.theme-en` (черный фон OLED `#000000`, фиолетовый акцент `#7c3aed`, стеклянные прозрачные карточки). Русская версия на `/` остается без изменений.

## Вопросы, требующие подтверждения / Важные моменты

> [!IMPORTANT]
> - Русская версия сайта на `/` полностью сохраняет свой текущий дизайн и текст.
> - Английская версия на `/en` активирует класс `.theme-en` на уровне тега `<html>`, что переопределяет CSS-переменные (цвета, шрифты, скругления) для создания нового премиального UI.
> - Автоматический редирект на основе языка браузера (`navigator.language`) и переключатель "Ru/En" в шапке уже интегрированы на уровне `Layout.astro` и `Header.astro`. Они будут тщательно протестированы.

## Планируемые изменения

### Компоненты и страницы

#### 1. [ProcessCardsEn.tsx](file:///Users/eugene/MyProjects/broz.agency/src/components/en/ProcessCardsEn.tsx) [NEW]
- Интерактивный React/Framer Motion компонент карточек процесса на английском языке.
- Перевод этапов: Designing (Проектирование), AI Design (AI-Дизайн), Development (Разработка), Automation (Автоматизация).

#### 2. [ProcessEn.astro](file:///Users/eugene/MyProjects/broz.agency/src/components/en/ProcessEn.astro) [NEW]
- Англоязычная секция-обертка для карточек процесса.
- Локализация заголовков ("Your path to the product", "Transparent process from first call to working system").

#### 3. [PricingEn.astro](file:///Users/eugene/MyProjects/broz.agency/src/components/en/PricingEn.astro) [NEW]
- Англоязычная секция тарифов:
  - **Start MVP** ($500): Rapid hypothesis validation. Prototype, UI/UX, first working version in 48 hours.
  - **Full Product** ($4500): Full-scale product with scalable architecture and deep UX.
  - **AI Automation** (Custom): Automating complex business processes with LLMs and custom RAG systems.
- Перевод списков функций, плашек и кнопок призыва к действию (CTA).

#### 4. [PortfolioEn.astro](file:///Users/eugene/MyProjects/broz.agency/src/components/en/PortfolioEn.astro) [NEW]
- Перевод описаний и категорий избранных кейсов (CoinLover, Baonline, NewAddress, RAG Online, RAG Search).

#### 5. [ContactEn.astro](file:///Users/eugene/MyProjects/broz.agency/src/components/en/ContactEn.astro) [NEW]
- Перевод контактной секции, заголовков ("Let's build something outstanding"), кнопок соцсетей (Telegram, WhatsApp) и копирайта футера.

#### 6. [TrustBadgeEn.tsx](file:///Users/eugene/MyProjects/broz.agency/src/components/en/TrustBadgeEn.tsx) [NEW]
- Плавающий бейдж в правом нижнем углу экрана для английской версии: "FlutterFlow Expert" / "Expert @flutterflow_rus".

#### 7. [en.astro](file:///Users/eugene/MyProjects/broz.agency/src/pages/en.astro) [NEW]
- Основной роут страницы `/en`, собирающий воедино все англоязычные компоненты:
  - Layout (с `lang="en"`)
  - HeroEn
  - MagicSliderEn (client:load)
  - ProcessEn
  - AboutEn
  - PricingEn
  - PortfolioEn
  - TrustBadgeEn (client:load)
  - ContactEn

## План тестирования и верификации

### Ручное тестирование локально:
1. Запустить локальный сервер `npm run dev`.
2. Проверить ручной клик по переключателю языка в шапке (переход `/` <-> `/en`).
3. Убедиться, что `localStorage` запоминает выбор пользователя.
4. Проверить автоматическое перенаправление при первом заходе (с чистым `localStorage`) в зависимости от языка браузера.
5. Оценить визуальное оформление (Dark Glassmorphism Premium) английской версии сайта на `/en` на соответствие дизайн-коду.
