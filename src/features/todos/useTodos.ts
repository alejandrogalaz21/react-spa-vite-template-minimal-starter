import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Type definition for a Todo item
 */
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Hook to manage Todos with React Query
 */
export const useTodos = () => {
  const queryClient = useQueryClient();

  /**
   * Fetch all todos from the API
   */
  const todosQuery = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) throw new Error('Failed to fetch todos');
      return response.json();
    },
  });

  /**
   * Add a new Todo
   */
  const addTodo = useMutation({
    mutationFn: async (title: string) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  /**
   * Toggle completion of a Todo
   */
  const toggleTodo = useMutation({
    mutationFn: async (todo: Todo) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) throw new Error('Failed to toggle todo');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  /**
   * Delete a Todo
   */
  const deleteTodo = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todosQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
