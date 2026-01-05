'use client';

import { motion } from 'framer-motion';
import { TaskCard } from './TaskCard';
import { useTaskStore } from '@/store/taskStore';
import { staggerContainer } from '@/lib/animations';

export function TaskList() {
  const { tasks, isLoading, error } = useTaskStore();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface rounded-lg p-4 border border-border animate-pulse"
          >
            <div className="h-6 bg-border rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-border rounded w-full mb-2"></div>
            <div className="h-4 bg-border rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface rounded-lg p-6 border border-border text-center">
        <p className="text-red-400 mb-2">Error loading tasks</p>
        <p className="text-text-secondary text-sm">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-surface rounded-lg p-12 border border-border text-center">
        <p className="text-text-secondary text-lg">No tasks yet</p>
        <p className="text-text-secondary text-sm mt-2">
          Create your first task above to get started!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-4"
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </motion.div>
  );
}
