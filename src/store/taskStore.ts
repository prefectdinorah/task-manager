import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/task.types';

interface DatabaseTask {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  editingTaskId: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (title: string, description?: string) => Promise<void>;
  updateTask: (id: string, title: string, description?: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setEditingTaskId: (id: string | null) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  editingTaskId: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const tasks: Task[] = ((data as DatabaseTask[]) || []).map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description || undefined,
        completed: task.completed,
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
      }));

      set({ tasks, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch tasks',
        isLoading: false,
      });
    }
  },

  addTask: async (title: string, description?: string) => {
    set({ isLoading: true, error: null });
    try {
      // @ts-ignore - Supabase type inference issue
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title,
            description: description || null,
            completed: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const dbTask = data as DatabaseTask;
      const newTask: Task = {
        id: dbTask.id,
        title: dbTask.title,
        description: dbTask.description || undefined,
        completed: dbTask.completed,
        createdAt: new Date(dbTask.created_at),
        updatedAt: new Date(dbTask.updated_at),
      };

      set({ tasks: [newTask, ...get().tasks], isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add task',
        isLoading: false,
      });
      throw error;
    }
  },

  updateTask: async (id: string, title: string, description?: string) => {
    set({ isLoading: true, error: null });
    try {
      // @ts-ignore - Supabase type inference issue
      const { data, error } = await supabase
        .from('tasks')
        .update({
          title,
          description: description || null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const dbTask = data as DatabaseTask;
      const updatedTask: Task = {
        id: dbTask.id,
        title: dbTask.title,
        description: dbTask.description || undefined,
        completed: dbTask.completed,
        createdAt: new Date(dbTask.created_at),
        updatedAt: new Date(dbTask.updated_at),
      };

      set({
        tasks: get().tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
        isLoading: false,
        editingTaskId: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update task',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id);

      if (error) throw error;

      set({
        tasks: get().tasks.filter((task) => task.id !== id),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete task',
        isLoading: false,
      });
      throw error;
    }
  },

  setEditingTaskId: (id: string | null) => {
    set({ editingTaskId: id });
  },
}));
