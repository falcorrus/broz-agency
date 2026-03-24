# broz.agency Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Создать современный лендинг на Astro с интерактивными островами, упакованный в Docker и готовый к деплою на VPS.

**Architecture:** Статическая генерация (SSG) на базе Astro. Интерактивные элементы (Slider, CTA) реализованы как React-компоненты. Деплой через Docker (Nginx:alpine) на VPS.

**Tech Stack:** Astro, React, Tailwind CSS, Framer Motion, Docker.

---

### Task 1: Project Initialization

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`
- Create: `src/pages/index.astro`, `src/layouts/Layout.astro`

- [ ] **Step 1: Initialize Astro project**
Run: `npm create astro@latest . -- --template minimal --install --no-git --typescript strict`
Expected: Folder structure created.

- [ ] **Step 2: Add Integrations (React, Tailwind)**
Run: `npx astro add react tailwind`
Expected: `astro.config.mjs` updated, dependencies installed.

- [ ] **Step 3: Create Base Layout**
```astro
---
// src/layouts/Layout.astro
export interface Props { title: string; }
const { title } = Astro.props;
---
<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<title>{title}</title>
	</head>
	<body class="bg-[#050505] text-white font-sans">
		<slot />
	</body>
</html>
```

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "chore: init astro project with react and tailwind"
```

### Task 2: Core Components (Visual Showcase)

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/Portfolio.astro`
- Create: `src/components/TrustBadge.tsx` (React)

- [ ] **Step 1: Implement Hero section**
Modify `src/components/Hero.astro` with "Results Oriented" copy and Product Dynamic styles.

- [ ] **Step 2: Implement Trust Badge (Floating)**
```tsx
// src/components/TrustBadge.tsx
import { motion } from "framer-motion";
export const TrustBadge = () => (
  <motion.a 
    href="https://t.me/flutterflow_rus" 
    className="fixed bottom-4 right-4 bg-[#6d5dfc] text-white text-[10px] px-3 py-1.5 rounded-lg shadow-lg z-50"
    whileHover={{ scale: 1.05 }}
  >
    Verified Expert @flutterflow_rus
  </motion.a>
);
```

- [ ] **Step 3: Test Layout Rendering**
Run: `npm run dev`
Expected: Preview shows Hero and floating badge.

- [ ] **Step 4: Commit**
```bash
git add src/components/
git commit -m "feat: add hero and trust badge components"
```

### Task 3: Interactive Magic (Prompt-to-UI Slider)

**Files:**
- Create: `src/components/MagicSlider.tsx` (React)
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create MagicSlider component**
Implement "Before/After" logic using Framer Motion.

- [ ] **Step 2: Add component to Index page**
```astro
<MagicSlider client:load />
```

- [ ] **Step 3: Commit**
```bash
git add src/components/MagicSlider.tsx
git commit -m "feat: implement prompt-to-ui interactive slider"
```

### Task 4: Containerization (Docker)

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `nginx.conf`

- [ ] **Step 1: Write Multi-stage Dockerfile**
```dockerfile
# Build stage
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

- [ ] **Step 2: Build and Test Container**
Run: `docker build -t broz-agency .`
Run: `docker run -p 8020:80 broz-agency`
Expected: Site accessible at `localhost:8020`.

- [ ] **Step 3: Commit**
```bash
git add Dockerfile docker-compose.yml nginx.conf
git commit -m "ops: add docker configuration"
```

### Task 5: Deployment Script

**Files:**
- Create: `deploy.sh`

- [ ] **Step 1: Write deploy script**
```bash
#!/bin/bash
# deploy.sh
ssh user@vps "cd /path/to/project && git pull && docker compose up -d --build"
```

- [ ] **Step 2: Test script (Dry Run/Local)**
Expected: Script correctly targets remote server.

- [ ] **Step 3: Commit**
```bash
git add deploy.sh
chmod +x deploy.sh
git commit -m "ops: add deployment script"
```
