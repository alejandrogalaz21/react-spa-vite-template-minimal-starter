import React, { useState } from 'react';

import { useTodos, type Todo } from './useTodos';

/**
 * TodosList component displays todos and provides CRUD actions
 * @returns {JSX.Element}
 */
export const TodosList: React.FC = () => {
  const { todosQuery, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [newTitle, setNewTitle] = useState('');

  if (todosQuery.isLoading) return <p>Loading todos...</p>;
  if (todosQuery.error) return <p>Error: {todosQuery.error.message}</p>;

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addTodo.mutate(newTitle);
    setNewTitle('');
  };

  return (
    <div>
      <h2>Todos List</h2>

      {/* Add new Todo */}
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New todo"
      />
      <button type="button" onClick={handleAdd} disabled={addTodo.isPending}>
        {addTodo.isPending ? 'Adding...' : 'Add'}
      </button>

      {/* List todos */}
      <ul>
        {todosQuery.data?.map((todo: Todo) => (
          <li key={todo.id}>
            <span
              role="button"
              tabIndex={0}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleTodo.mutate(todo)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleTodo.mutate(todo);
                }
              }}
            >
              {todo.title}
            </span>
            <button type="button" onClick={() => deleteTodo.mutate(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
