import React from 'react';

const MainSidebar = ({ isVisible, categories }) => { // Accept isVisible prop
  return (
    <aside 
      className={`bg-slate-100 dark:bg-slate-900 border-r border-slate-300 dark:border-slate-700 transition-all duration-300 ease-in-out overflow-hidden ${
        isVisible ? 'w-64 p-4' : 'w-0 p-0'
      }`}
    >
      <div className="min-w-[14rem]"> {/* Prevent content from wrapping during collapse */}
        <h2 className="text-lg font-semibold mb-4">Notes</h2>
        {/* Note tree will go here */}
        <p className="text-sm text-slate-500">Note categories and files will be listed here.</p>
      </div>
    </aside>
  );
};

export default MainSidebar;
