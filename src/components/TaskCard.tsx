'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Task } from '@/types/task.types';
import { taskCardVariants, hoverScale } from '@/lib/animations';
import { useTaskStore } from '@/store/taskStore';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateTask, deleteTask } = useTaskStore();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    setIsSubmitting(true);
    try {
      await updateTask(task.id, editTitle.trim(), editDescription.trim() || undefined);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <motion.div
        variants={taskCardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-surface rounded-lg p-4 border border-accent"
      >
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg
                   text-text-primary mb-3
                   focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Task title..."
          disabled={isSubmitting}
          autoFocus
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg
                   text-text-primary mb-3 resize-none
                   focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Description (optional)..."
          rows={3}
          disabled={isSubmitting}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSubmitting || !editTitle.trim()}
            className="flex-1 px-4 py-2 bg-accent text-background font-semibold rounded-lg
                     hover:bg-opacity-90 active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-surface border border-border text-text-primary font-semibold rounded-lg
                     hover:bg-background active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    );
  }

  if (showDeleteConfirm) {
    return (
      <motion.div
        variants={taskCardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-surface rounded-lg p-4 border border-red-500"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Delete Task?
        </h3>
        <p className="text-text-secondary mb-4 text-sm">
          Are you sure you want to delete "{task.title}"? This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg
                     hover:bg-red-600 active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          >
            {isSubmitting ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-surface border border-border text-text-primary font-semibold rounded-lg
                     hover:bg-background active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={taskCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      {...hoverScale}
      className="bg-surface rounded-lg p-4 border border-border"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-text-primary flex-1">
          {task.title}
        </h3>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm text-accent hover:bg-accent hover:text-background
                     rounded-lg transition-all duration-200"
            title="Edit task"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-1 text-sm text-red-400 hover:bg-red-500 hover:text-white
                     rounded-lg transition-all duration-200"
            title="Delete task"
          >
            Delete
          </button>
        </div>
      </div>
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
