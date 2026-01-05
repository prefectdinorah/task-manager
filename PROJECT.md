# Task Manager - Описание проекта

## 🎯 О проекте

Современный Task Manager с красивыми анимациями в стиле Claude.ai.
Разработка ведётся через автономный workflow с уведомлениями в Telegram.

## 🛠 Технологии

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **State**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **MCP**: Supabase, Git, Vercel

## 🎨 Дизайн система

### Цвета (в стиле Claude.ai)
\`\`\`css
--background: #1E1E1E
--surface: #2A2A2A
--accent: #E67E50 (оранжевый)
--text-primary: #E5E5E5
--text-secondary: #A0A0A0
--border: #3A3A3A
\`\`\`

### Типографика
- Шрифт: Inter
- Заголовки: 24-32px, font-semibold
- Текст: 14-16px, font-normal

### Компоненты
- Закругления: rounded-lg (12px)
- Тени: subtle shadows
- Анимации: duration-300, ease-out
- Hover: subtle scale/opacity

## 📁 Структура проекта

\`\`\`
task-manager/
├── .claude/
│   ├── scripts/        # Автоматизация
│   └── config.json     # Конфигурация
├── docs/
│   ├── project_spec.md
│   ├── architecture.md
│   ├── changelog.md
│   ├── project_status.md
│   └── features/       # Спецификации фич
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/
│   │   ├── ui/       # shadcn/ui
│   │   └── shared/   # Общие компоненты
│   ├── lib/
│   │   ├── animations.ts
│   │   ├── supabase.ts
│   │   └── utils.ts
│   └── types/
├── claude.md          # Универсальные инструкции
├── PROJECT.md         # Этот файл
└── package.json
\`\`\`

## 🎨 Стандарты кода

### Структура компонента
\`\`\`tsx
'use client' // если нужны хуки

import { motion } from 'framer-motion'

interface Props {
  title: string
  onUpdate: (id: string) => void
}

export function TaskCard({ title, onUpdate }: Props) {
  const handleClick = () => {
    onUpdate('task-id')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-surface rounded-lg p-4"
    >
      <h3>{title}</h3>
    </motion.div>
  )
}
\`\`\`

### Именование
- Компоненты: \`TaskCard.tsx\` (PascalCase)
- Хуки: \`useTaskManager.ts\`
- Утилиты: \`formatDate.ts\`
- Типы: \`task.types.ts\`
- Константы: \`ANIMATION_VARIANTS.ts\`

### Tailwind
Используй токены дизайн-системы:
\`\`\`tsx
className="bg-surface text-primary"
\`\`\`

### Анимации
Создавай в \`/lib/animations.ts\`:
\`\`\`ts
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}
\`\`\`

## 🧪 Тестирование

\`\`\`bash
npm run test              # Unit + Component
npm run test:e2e          # E2E
npm run test:coverage     # Coverage
\`\`\`

## 📞 Telegram Bot

Конфигурация находится в `.claude/config.json` (не коммитится в git)
