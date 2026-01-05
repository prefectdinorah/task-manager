'use client';

import { useEffect } from 'react';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { useTaskStore } from '@/store/taskStore';

export default function Home() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary">
            Task Manager
          </h1>
          <p className="text-text-secondary mt-2">
            Manage your tasks with style
          </p>
        </header>

        <div className="space-y-8">
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </main>
  );
}
