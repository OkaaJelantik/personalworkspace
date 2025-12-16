import React from 'react';

const MainSidebar = () => {
  return (
    <aside className="w-64 bg-slate-100 dark:bg-slate-900 p-4">
      <h2 className="text-lg font-semibold mb-4">Notes</h2>
      {/* Note tree will go here */}
      <p className="text-sm text-slate-500">Note categories and files will be listed here.</p>
    </aside>
  );
};

export default MainSidebar;
