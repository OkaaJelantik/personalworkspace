import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { getTodos, addTodo as addTodoDB, updateTodo as updateTodoDB, deleteTodo as deleteTodoDB } from '../services/db';
import { useToast } from '../contexts/ToastContext';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromDB = await getTodos();
        setTodos(todosFromDB);
      } catch (err) {
        setError('Failed to load todos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodoTitle.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
      note: '',
      deadline: null,
      priority: 'Medium',
    };
    try {
      const addedTodo = await addTodoDB(newTodo);
      setTodos([...todos, addedTodo]);
      setNewTodoTitle('');
      showToast('Todo added successfully!');
    } catch (err) {
      setError('Failed to add todo.');
      console.error(err);
    }
  };

  const updateTodo = async (id, updatedFields) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, ...updatedFields };
      try {
        await updateTodoDB(updatedTodo);
        setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
        showToast('Todo updated successfully!');
      } catch (err) {
        setError('Failed to update todo.');
        console.error(err);
      }
    }
  };

  const toggleComplete = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      updateTodo(id, { completed: !todo.completed });
    }
  };

  const updateNote = (id, newNote) => {
    updateTodo(id, { note: newNote });
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoDB(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      showToast('Todo deleted successfully!');
    } catch (err) {
      setError('Failed to delete todo.');
      console.error(err);
    }
  };

  const editTodoTitle = (id, newTitle) => {
    updateTodo(id, { title: newTitle });
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
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b"></th>
              <th className="py-2 px-4 border-b text-left">Task</th>
              <th className="py-2 px-4 border-b text-left">Notes</th>
              <th className="py-2 px-4 border-b text-left">Deadline</th>
              <th className="py-2 px-4 border-b text-left">Priority</th>
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
                updateTodo={updateTodo}
              />
            ))}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
};

export default TodoList;
