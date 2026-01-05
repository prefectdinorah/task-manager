'use client';

import { motion } from 'framer-motion';
import { Task } from '@/types/task.types';
import { taskCardVariants, hoverScale } from '@/lib/animations';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <motion.div
      variants={taskCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      {...hoverScale}
      className="bg-surface rounded-lg p-4 border border-border"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-text-secondary mb-3 text-sm leading-relaxed">
          {task.description}
        </p>
      )}
      <time className="text-xs text-text-secondary">
        {formatDate(task.createdAt)}
      </time>
    </motion.div>
  );
}
