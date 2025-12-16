import React, { useState } from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodoTitle, updateTodo, openSidebar }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodoTitle(todo.id, editedTitle);
    setIsEditing(false);
  };

  const handlePriorityChange = (e) => {
    updateTodo(todo.id, { priority: e.target.value });
  };

  const handleDeadlineChange = (e) => {
    updateTodo(todo.id, { deadline: e.target.value });
  };

  const deadlinePassed = todo.deadline && new Date(todo.deadline) < new Date();

  const priorityColors = {
    Low: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100',
    High: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
  };

  return (
    <tr className={`border-b dark:border-b-slate-700 ${todo.completed ? 'bg-slate-50 dark:bg-slate-700 text-slate-400 line-through' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'} hover:bg-slate-100 dark:hover:bg-slate-600`}>
      <td className="py-3 px-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
        />
      </td>
      <td className="py-3 px-4">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <span>{todo.title}</span>
        )}
      </td>
      <td className="py-3 px-4">
        <button
          onClick={() => openSidebar(todo)}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          Open Note
        </button>
      </td>
      <td className="py-3 px-4">
        <input
          type="datetime-local"
          value={todo.deadline || ''}
          onChange={handleDeadlineChange}
          className={`w-full p-2 border border-slate-300 dark:border-slate-600 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${deadlinePassed ? 'text-red-500' : ''}`}
        />
      </td>
      <td className="py-3 px-4">
        <select
          value={todo.priority}
          onChange={handlePriorityChange}
          className={`w-full p-2 border border-slate-300 dark:border-slate-600 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${priorityColors[todo.priority]}`}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </td>
      <td className="py-3 px-4 space-x-2">
        {isEditing ? (
          <button
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <button
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
