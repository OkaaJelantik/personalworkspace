import React from 'react';
import TodoView from '../views/TodoView';

const WorkingArea = ({ activeTab }) => {
  return (
    <main className="flex-1 flex flex-col bg-white dark:bg-slate-800">
      <div className="p-6 flex-grow overflow-y-auto">
        {activeTab && activeTab.type === 'welcome' && (
          <div>
            <h1 className="text-2xl font-bold">{activeTab.title}</h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Welcome to your Personal Workspace.</p>
          </div>
        )}
        {activeTab && activeTab.type === 'todo' && (
          <TodoView />
        )}
        {!activeTab && (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500">No active tabs.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default WorkingArea;
