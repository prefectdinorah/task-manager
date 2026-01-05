'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '@/store/taskStore';
import { slideInUp } from '@/lib/animations';

export function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (!title.trim()) {
      setValidationError('Task title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await addTask(title.trim(), description.trim() || undefined);
      // Reset form on success
      setTitle('');
      setDescription('');
    } catch (error) {
      setValidationError(
        error instanceof Error ? error.message : 'Failed to add task'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      variants={slideInUp}
      initial="initial"
      animate="animate"
      onSubmit={handleSubmit}
      className="bg-surface rounded-lg p-6 border border-border"
    >
      <h2 className="text-xl font-semibold text-text-primary mb-4">
        Add New Task
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Title <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full px-4 py-2 bg-background border border-border rounded-lg
                     text-text-primary placeholder-text-secondary
                     focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                     transition-all duration-200"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Description <span className="text-text-secondary">(optional)</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows={3}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg
                     text-text-primary placeholder-text-secondary
                     focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                     transition-all duration-200 resize-none"
            disabled={isSubmitting}
          />
        </div>

        {validationError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm"
          >
            {validationError}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-accent text-background font-semibold rounded-lg
                   hover:bg-opacity-90 active:scale-[0.98]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </motion.form>
  );
}
