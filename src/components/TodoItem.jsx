import React, { useState } from 'react';

const TodoItem = ({ todo, toggleComplete, updateNote, deleteTodo, editTodoTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodoTitle(todo.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <tr className={todo.completed ? 'bg-gray-100 line-through' : 'bg-white'}>
      <td className="py-2 px-4 border-b">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
      </td>
      <td className="py-2 px-4 border-b">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-1 border border-gray-200 rounded"
          />
        ) : (
          <span>{todo.title}</span>
        )}
      </td>
      <td className="py-2 px-4 border-b">
        <textarea
          className="w-full p-1 border border-gray-200 rounded"
          value={todo.note}
          onChange={(e) => updateNote(todo.id, e.target.value)}
          rows="2"
        />
      </td>
      <td className="py-2 px-4 border-b space-x-2">
        {isEditing ? (
          <button
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <button
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
