import { useEffect, useState } from 'react';
import './styles.css';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('TODOS');
    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(() => {
    localStorage.setItem('TODOS', JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => {
        return todo.id !== id;
      });
    });
  }

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: title, completed: false },
      ];
    });
  }

  return (
    <>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
