import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFilter } from '@/types/todo';
import { loadTodos, saveTodos } from '@/utils/storage';

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await loadTodos();
      setTodos(stored);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!isLoading) saveTodos(todos);
  }, [todos, isLoading]);

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [
      { id: generateId(), text: trimmed, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed));
  }, []);

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
  };
}
