import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '@/types/todo';

const TODOS_KEY = '@todos';

export const loadTodos = async (): Promise<Todo[]> => {
  try {
    const raw = await AsyncStorage.getItem(TODOS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Todo[];
  } catch {
    return [];
  }
};

export const saveTodos = async (todos: Todo[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch {}
};
