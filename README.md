# Broz Agency (broz.agency)

Персональный сайт-визитка Евгения Киршина (Broz), Full Cycle Product Engineer и основателя сообщества «FlutterFlow Rus».

## 🎯 О проекте
Сайт позиционирует владельца как эксперта, создающего прибыльные IT-решения (Mobile, Web, AI Automation) за 24 часа. Основной акцент сделан на интерактивном доказательстве скорости (Magic Slider) и визуальном портфолио кейсов.

## 🛠 Технологический стек
- **Frontend:** Astro 6 (SSG) + React 19
- **Styling:** Tailwind CSS v4 + Framer Motion (анимации)
- **Containerization:** Docker (nginx:alpine, non-root security)
- **Hosting:** Собственный VPS (Ubuntu)
- **Deployment:** GitHub -> VPS via `deploy.sh`

## 📂 Структура проекта
- `src/components/`:
    - `Hero.astro` — Главный экран с оффером.
    - `MagicSlider.tsx` — Интерактивный слайдер «Заявка → AI-система».
    - `Portfolio.astro` — Витрина проектов (Mobile, Web, Automation).
    - `Contact.astro` — Форма связи с пульсирующим статусом доступности.
    - `TrustBadge.tsx` — Полупрозрачный бейдж эксперта.
- `nginx.conf`: Настройки безопасности (CSP, HSTS, Gzip).
- `deploy.sh`: Скрипт автоматизации деплоя.

## 🚀 Как работать с проектом

### Локальная разработка
```bash
npm install
npm run dev
```

### Деплой на сервер
```bash
./deploy.sh
```
*Скрипт автоматически запушит изменения в main, зайдет на VPS, подтянет код и перезапустит Docker-контейнер.*

## 🐳 Docker
Проект работает на порту **8020** (хост) -> **8080** (контейнер).
Управление через `docker-compose.yml`.
