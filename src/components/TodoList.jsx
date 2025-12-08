import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodoTitle.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
      note: '',
    };
    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateNote = (id, newNote) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, note: newNote } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodoTitle = (id, newTitle) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Workspace</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded mr-2"
          placeholder="Add a new to-do item..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b"></th>
              <th className="py-2 px-4 border-b text-left">Task</th>
              <th className="py-2 px-4 border-b text-left">Notes</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                updateNote={updateNote}
                deleteTodo={deleteTodo}
                editTodoTitle={editTodoTitle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
