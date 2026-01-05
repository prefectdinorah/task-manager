# Supabase Setup Instructions

## 1. Создание проекта

1. Зайдите на https://app.supabase.com
2. Нажмите "New Project"
3. Заполните:
   - Name: `task-manager`
   - Database Password: (сгенерируйте надёжный пароль)
   - Region: выберите ближайший регион
4. Дождитесь создания проекта (~2 минуты)

## 2. Создание таблицы tasks

Перейдите в SQL Editor и выполните:

\`\`\`sql
-- Create tasks table
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (temporary, for MVP)
CREATE POLICY "Enable all access for all users" ON tasks
  FOR ALL
  USING (true)
  WITH CHECK (true);
\`\`\`

## 3. Получение API ключей

1. Перейдите в Settings → API
2. Скопируйте:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Настройка .env.local

Создайте файл `.env.local` в корне проекта:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Вставьте ваши ключи в `.env.local`

## 5. Проверка подключения

Запустите dev сервер:

\`\`\`bash
npm run dev
\`\`\`

Откройте http://localhost:3000

## Готово!

База данных готова к использованию.
