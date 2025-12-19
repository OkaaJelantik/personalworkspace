import React from 'react';
import TodoView from '../views/TodoView';
import MarkdownEditor from '../MarkdownEditor';
import TabBar from './TabBar'; // Import TabBar
import { updateTodo } from '../../services/db';

const WorkingArea = ({ activeTab, openTodoNoteInTab, categories, tabs, activeTabId, onSelectTab, onCloseTab }) => {
  const handleNoteUpdate = async (todoId, newNoteContent) => {
    try {
      await updateTodo({ id: todoId, note: newNoteContent });
      // Optionally show a toast or update UI
      console.log(`Note for todo ${todoId} updated.`);
    } catch (error) {
      console.error('Failed to update todo note:', error);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-900">
      <TabBar 
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={onSelectTab}
        onCloseTab={onCloseTab}
      />
      <div className="p-6 flex-grow overflow-y-auto bg-white dark:bg-slate-800 rounded-b-lg">
        {activeTab && activeTab.type === 'welcome' && (
          <div>
            <h1 className="text-2xl font-bold">{activeTab.title}</h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Welcome to your Personal Workspace.</p>
          </div>
        )}
        {activeTab && activeTab.type === 'todo' && (
          <TodoView />
        )}
        {/* The 'todo-note' type will now be handled by a modal within TodoView */}
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
