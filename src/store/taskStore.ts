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
  fetchTasks: () => Promise<void>;
  addTask: (title: string, description?: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

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
}));
