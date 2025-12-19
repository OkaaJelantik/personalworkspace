import React from 'react';

// Placeholder icons - in a real app, these would be from a library or separate files
const SidebarIcon = ({ isVisible }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {isVisible ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    )}
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);


const Toolbar = ({ onToggleSidebar, onOpenTodoList, isSidebarVisible }) => {
  return (
    <div className="h-screen bg-slate-200 dark:bg-slate-800 p-2 flex flex-col items-center space-y-4">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200"
        title={isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
      >
        <SidebarIcon isVisible={isSidebarVisible} />
      </button>
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

export default Toolbar;
