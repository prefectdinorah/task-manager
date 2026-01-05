# Feature: Task Management (Add & Display)

**Status**: 📋 Planning
**Created**: 2026-01-05

## Description

Basic task management functionality allowing users to create new tasks and view them in a list. This is the core MVP feature that enables users to add tasks with titles and descriptions, and see all their tasks displayed in a clean, animated interface styled like Claude.ai.

## Requirements

### Functional Requirements
- [ ] Users can add new tasks with a title (required)
- [ ] Users can optionally add a description to tasks
- [ ] Tasks display in a list view with most recent first
- [ ] Each task shows title, description, and creation date
- [ ] Empty state shows when no tasks exist
- [ ] Form validation prevents empty task titles
- [ ] Tasks are persisted to Supabase database

### UI/UX Requirements
- [ ] Smooth animations for task creation (fade in, slide in)
- [ ] Form appears at top of page
- [ ] Task cards have Claude.ai styling (surface bg, rounded corners)
- [ ] Responsive design (mobile + desktop)
- [ ] Loading states during data fetch
- [ ] Error handling with user-friendly messages

## Technical Details

### Components
- `TaskForm` - Form for adding new tasks
  - Input for title (required)
  - Textarea for description (optional)
  - Submit button with loading state
- `TaskList` - Container for displaying tasks
  - Maps over tasks array
  - Shows empty state when no tasks
  - Loading skeleton during fetch
- `TaskCard` - Individual task display
  - Shows title, description, timestamp
  - Animated entrance
  - Hover effects

### API/Database
- **Table**: `tasks` (already defined in architecture.md)
- **Operations**:
  - `INSERT` - Add new task
  - `SELECT` - Fetch all tasks ordered by created_at DESC

### State Management
- Use Zustand store for tasks state
- Store schema:
  ```ts
  interface TaskStore {
    tasks: Task[]
    isLoading: boolean
    error: string | null
    fetchTasks: () => Promise<void>
    addTask: (title: string, description?: string) => Promise<void>
  }
  ```

### File Structure
```
src/
├── app/
│   └── page.tsx (update with TaskForm + TaskList)
├── components/
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   └── TaskCard.tsx
├── lib/
│   └── animations.ts (add task-related variants)
└── store/
    └── taskStore.ts
```

## Testing

### Unit Tests
- [ ] TaskForm validates required title
- [ ] TaskForm handles submission correctly
- [ ] TaskStore adds tasks to state
- [ ] TaskStore fetches tasks from Supabase

### Integration Tests
- [ ] Full flow: add task → appears in list
- [ ] Database persistence verified
- [ ] Error handling works correctly

### E2E Scenarios
- [ ] User can add a task and see it appear
- [ ] User can add multiple tasks
- [ ] Tasks persist after page refresh
- [ ] Empty state shows initially

## Timeline

- **Planning**: 30 mins (this spec)
- **Development**: 2-3 hours
  - Components: 1 hour
  - Zustand store: 30 mins
  - Supabase integration: 45 mins
  - Styling & animations: 45 mins
- **Testing**: 1 hour
- **Total**: ~4 hours

## Success Criteria

1. Users can successfully add tasks
2. Tasks appear immediately in the UI
3. Tasks persist to database
4. Animations are smooth (60fps)
5. No console errors
6. Responsive on mobile and desktop
