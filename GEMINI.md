# Broz Agency (broz.agency)

## Project Context
Этот проект — ваш личный лендинг-визитка. Он построен на Astro для максимальной скорости и SEO, с использованием React для интерактивных элементов.

## Core Mandates & Rules
- **Deployment:** Всегда используй `./deploy.sh` для обновления сайта на сервере. Не вноси ручные изменения в Nginx на VPS без обновления `nginx.conf` в репозитории.
- **Design:** Строго соблюдай "Linear Style" (Tailwind @theme в `global.css`). 
- **Docker:** Контейнер должен работать под не-root пользователем `nginx`. 
- **Security:** При добавлении внешних ресурсов (шрифты, картинки) обязательно обновляй Content-Security-Policy в `nginx.conf`.
- **Formatting:** Сохраняй русскую локализацию для всех текстов, ориентированных на клиента.

## Key Operations
- **Update Portfolio:** Новые проекты добавляются в массив `projects` в `src/components/Portfolio.astro`. Используй поле `category` для Mobile/Web/Automation.
- **Update Slider:** Тексты заявки и результата меняются в `src/components/MagicSlider.tsx`.
- **Fix Docker:** Если контейнер падает (unhealthy), проверяй IP в `healthcheck` в `docker-compose.yml` (используй `127.0.0.1` вместо `localhost`).

## Tech Stack
- Astro 6, React 19, Tailwind v4, Framer Motion.
- Docker, Nginx, VPS (Beget/Ubuntu).
- Domain: https://broz.agency
