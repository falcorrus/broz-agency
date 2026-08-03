---
type: "entity"
category: "project"
project: "broz.agency"
---
# Решенные задачи (Solutions Log)

В этом файле фиксируются успешно решенные архитектурные и технические задачи проекта `broz.agency`.

## 1. Мультиязычная архитектура и редиректы без FOUC (Flash of Unstyled Content)

### Проблема
Необходимо было внедрить автоматическое перенаправление пользователей на английскую версию `/en` (если язык браузера не русский) или на `/` (если русский), сохранив русскую версию без изменений. При этом важно избежать «моргания» интерфейса (FOUC), когда сначала загружается одна версия, а затем происходит редирект.

### Решение
1. В `<head>` макета `src/layouts/Layout.astro` был интегрирован компактный inline-скрипт (блокирующий рендеринг DOM, но выполняющийся мгновенно):
   ```html
   <script is:inline>
     (function() {
       const userLang = localStorage.getItem('user-language');
       const path = window.location.pathname;
       
       if (userLang) {
         if (userLang === 'en' && !path.startsWith('/en')) {
           window.location.replace('/en');
         } else if (userLang === 'ru' && path.startsWith('/en')) {
           window.location.replace('/');
         }
       } else {
         const browserLang = navigator.language || navigator.userLanguage;
         if (!browserLang.startsWith('ru') && !path.startsWith('/en')) {
           localStorage.setItem('user-language', 'en');
           window.location.replace('/en');
         } else if (browserLang.startsWith('ru') && path.startsWith('/en')) {
           localStorage.setItem('user-language', 'ru');
           window.location.replace('/');
         }
       }
     })();
   </script>
   ```
2. Использование `window.location.replace()` вместо `.assign()` исключило промежуточную страницу из истории переходов браузера, сохранив корректную работу кнопки «Назад».

---

## 2. Изолированная кастомизация тем через CSS-переменные (.theme-en)

### Проблема
Требовалось применить совершенно новый дизайн **"Dark Glassmorphism Premium"** (OLED-черный, фиолетовые неоновые акценты, размытие) для английской версии `/en`, полностью сохранив оригинальный дизайн (светло-синий классический, шрифты Bodoni/Jost) для русской версии `/`.

### Решение
1. Вместо создания дублирующих макетов и раздувания стилей, в `src/styles/global.css` был добавлен изолирующий класс `.theme-en`:
   ```css
   .theme-en {
     --color-background: #000000;
     --color-text-primary: #ffffff;
     --color-accent: #7c3aed;
     --color-accent-rgb: 124, 58, 237;
     --font-family-sans: 'Inter', 'DM Sans', sans-serif;
     /* Дополнительные переменные градиентов и эффектов */
   }
   ```
2. В `src/pages/en.astro` в макете `Layout` тегу `<html>` передается класс `theme-en`. Все Tailwind-переменные автоматически адаптируются под новую цветовую гамму и шрифты.

---

## 3. Автоматизированный Docker-деплой с Nginx-проксированием

### Проблема
Необходимо было быстро и надежно развернуть изменения на сервере `server.reloto.ru`, пересобрав Docker-контейнер и обеспечив корректную маршрутизацию.

### Решение
1. Запуск `./deploy.sh` с выбором ветки и опции деплоя.
2. Скрипт автоматически собирает новый Docker-образ с оптимизированным статическим билдом Astro (на базе `node:22-alpine` и `nginx:alpine`).
3. Контейнер перезапускается на порту `8020`, а Nginx на хосте проксирует запросы на домен `broz.agency`.

---

## 4. Устранение циклического редиректа на внутренний порт (Код ошибки 11)

### Проблема
При запросе `/en` (без завершающего слэша) Nginx внутри Docker-контейнера определял запрос как обращение к каталогу и автоматически выполнял 301-редирект с добавлением слэша. Поскольку по умолчанию в Nginx включен `port_in_redirect` и `absolute_redirect`, редирект формировался как абсолютный URL с указанием внутреннего порта контейнера: `http://broz.agency:8080/en/`. Поскольку порт `8080` закрыт снаружи, браузер выдавал ошибку подключения (`Код ошибки 11` или `ERR_CONNECTION_REFUSED`).

### Решение
1. В `nginx.conf` внутри Docker-контейнера в секцию `server` была добавлена директива:
   ```nginx
   absolute_redirect off;
   ```
2. Это переключило Nginx на формирование относительных редиректов (например, `Location: /en/` вместо абсолютного URL с портом `8080`).
3. После повторного деплоя относительный редирект корректно обрабатывается браузером через защищенное HTTPS-соединение (порт `443`), полностью решая проблему доступности сайта.

## 5. Переход на дизайн Neo-Brutalist Kinetic и устранение зацикливаний HMR

### Проблема
Устаревший дизайн русской и английской версий сайта выбивался из современной парадигмы портфолио IT-студий (имел несовместимый шрифт Bodoni Moda). Кроме того, скрипт языка в `Layout.astro` и несогласованный Vite Watcher вызывали частые перезагрузки страницы в локальном dev-окружении.

### Решение
1. **Дизайн-система Neo-Brutalist Kinetic:**
   - Подключена палитра Obsidian Charcoal (`#0a0a0c`), Bento Surface (`#131316`) и Electric Emerald (`#10b981`).
   - Настроена типографика: `Syne` (акцентные сверхкрупные кинетичные заголовки Awwwards style), `Inter` (текст), `JetBrains Mono` (номера `01/05` и метрики).
   - Обновлены все Astro и React компоненты (`Hero`, `About`, `Portfolio`, `Pricing`, `Contact`, `Header`, `MagicSlider`, `WaveText`).
2. **Стабильность HMR и локализации:**
   - Из `Layout.astro` удален агрессивный принудительный авто-редирект по `navigator.language`, заменен на локальное сохранение роута при открытии URL без перезагрузок.
   - В `astro.config.mjs` в Vite `server.watch.ignored` прописано исключение инструментальных и кэш-папок (`.antigravitycli`, `.superpowers`, `.gemini`, `dist`, `.git`), а также отключен оверлей ошибок HMR.
3. **Деплой:**
   - Выполнен запуск `./deploy.sh`, сайт задеплоен на `server.reloto.ru` в контейнере `broz-agency` (порт 8020) и работает на домене `https://broz.agency`.

---

## [14.06.2026] Записи, перенесенные из глобального vault.json

- **16.04.2026**: VPS Services Mapping: bao.reloto.ru=8021, broz.agency=8020, coinlover=8010, dev.coinlover=8011, ff-wiki=8044, n8n-eugene=5679, n8n-yuri=5678, supabase-studio=3001
- **20.05.2026**: Успешно внедрена мультиязычная архитектура для broz.agency. Сделан редирект в head без FOUC, реализована тема Dark Glassmorphism Premium через .theme-en, произведен успешный деплой Docker-контейнера на server.reloto.ru.
- **20.05.2026**: Исправлен Код ошибки 11 при переходе на broz.agency/en. В nginx.conf контейнера добавлено absolute_redirect off;, что убрало проброс внутреннего порта 8080 в 301-редиректах.
- **20.05.2026**: Property ID для сайта broz.agency: 529918398
- **30.07.2026**: Успешно обновлен дизайн broz.agency на концепцию Neo-Brutalist Kinetic (акцент #10b981, шрифт Syne/Inter/JetBrains Mono). Устранено зацикливание HMR и выложен релиз через ./deploy.sh.

## 6. Внедрение кейса MyeSIM и интерактивного фильтра бюджетов

### Проблема
Потребовалось добавить новый проект MyeSIM в портфолио и одновременно оптимизировать отображение растущего списка проектов с помощью фильтрации по бюджетам и срокам.

### Решение
1. Разработаны спецификация `spec-driven-development` и пошаговый план `incremental-implementation` (`tasks/spec.md`, `tasks/plan.md`, `tasks/todo.md`).
2. Добавлен централизованный типезируемый модуль данных `src/data/projects.ts` с бюджетами (`tier1` - 48ч, `tier2` - 2-4 нед, `tier3` - до 2 мес).
3. Создан React-компонент `src/components/PortfolioGrid.tsx` с табами бюджетов, плашками сроков и информацией о проектах для RU/EN версий.
4. Отключен зацикливающийся HMR в `astro.config.mjs` (`hmr: false`, расширен `watch.ignored`).

