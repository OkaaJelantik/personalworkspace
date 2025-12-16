import React from 'react';

// Using a simple placeholder for an icon
const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

const UtilityBar = ({ onOpenTodoList }) => {
  return (
    <div className="p-2 bg-slate-200 dark:bg-slate-700">
      <button
        onClick={onOpenTodoList}
        className="p-2 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200"
        title="Open To-do List"
      >
        <ListIcon />
      </button>
    </div>
  );
};

export default UtilityBar;
