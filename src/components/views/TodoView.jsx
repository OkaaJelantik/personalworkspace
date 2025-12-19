import React, { useState, useEffect } from 'react';
import TodoItem from '../TodoItem';
import { getTodos, addTodo as addTodoDB, updateTodo as updateTodoDB, deleteTodo as deleteTodoDB } from '../../services/db';
import { useToast } from '../../contexts/ToastContext';
import NoteModal from '../NoteModal'; // Import NoteModal
import MarkdownEditor from '../MarkdownEditor'; // Import MarkdownEditor

const TodoView = () => { // Removed openTodoNoteInTab prop
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTodoForNote, setSelectedTodoForNote] = useState(null); // State to manage the open note modal
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
        const newTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
        setTodos(newTodos);
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

  const openNoteForTodo = (todo) => {
    setSelectedTodoForNote(todo); // Open the modal by setting the todo
  };

  const handleCloseNoteModal = () => {
    setSelectedTodoForNote(null); // Close the modal
  };

  const handleNoteContentUpdate = async (newNoteContent) => {
    if (selectedTodoForNote) {
      await updateTodo(selectedTodoForNote.id, { note: newNoteContent });
      // To ensure the UI immediately reflects the change without reloading all todos:
      setSelectedTodoForNote(prev => ({ ...prev, note: newNoteContent }));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-slate-800 dark:text-slate-100">To-do List</h1>
      <div className="flex mb-8">
        <input
          type="text"
          className="flex-grow p-3 border-2 border-slate-200 dark:border-slate-700 rounded-l-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700"
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
          className="px-6 py-3 bg-blue-600 text-white font-bold text-lg rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
        <table className="min-w-full bg-white dark:bg-slate-800">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b dark:border-b-slate-700"></th>
              <th className="py-3 px-4 border-b dark:border-b-slate-700 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Task</th>
              <th className="py-3 px-4 border-b dark:border-b-slate-700 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Open Note</th>
              <th className="py-3 px-4 border-b dark:border-b-slate-700 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Deadline</th>
              <th className="py-3 px-4 border-b dark:border-b-slate-700 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="py-3 px-4 border-b dark:border-b-slate-700 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodoTitle={editTodoTitle}
                updateTodo={updateTodo}
                openSidebar={openNoteForTodo}
              />
            ))}
          </tbody>
        </table>
        )}
      </div>

      {selectedTodoForNote && (
        <NoteModal isOpen={true} onClose={handleCloseNoteModal}>
          <h2 className="text-xl font-bold mb-4">Note for: {selectedTodoForNote.title}</h2>
          <MarkdownEditor
            content={selectedTodoForNote.note}
            onUpdate={handleNoteContentUpdate}
          />
        </NoteModal>
      )}
    </div>
  );
};

export default TodoView;
