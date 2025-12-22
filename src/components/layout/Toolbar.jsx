import React from 'react';
import { PanelLeft, ListTodo, Sun, Moon, XSquare } from 'lucide-react';

const Toolbar = ({ onToggleSidebar, onToggleTodoList, onCloseAllTabs, isSidebarVisible, theme, onToggleTheme }) => {
  return (
    <div className="w-12 h-screen bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-4 gap-4 z-50">
      {/* Sidebar Toggle */}
      <button
        onClick={onToggleSidebar}
        className={`p-2 rounded-md transition-colors duration-200 ${
          isSidebarVisible 
            ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' 
            : 'text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
        }`}
        title={isSidebarVisible ? "Tutup Sidebar" : "Buka Sidebar"}
      >
        <PanelLeft size={20} />
      </button>

      {/* Todo List Toggle */}
      <button
        onClick={onToggleTodoList}
        className="p-2 rounded-md text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
        title="Buka/Tutup To-do List"
      >
        <ListTodo size={20} />
      </button>

      {/* Close All Tabs */}
      <button
        onClick={onCloseAllTabs}
        className="p-2 rounded-md text-zinc-500 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
        title="Tutup Semua Tab"
      >
        <XSquare size={20} />
      </button>

      {/* Spacer to push Theme Toggle to bottom */}
      <div className="flex-grow"></div>

      {/* Theme Toggle */}
      <button
        onClick={onToggleTheme}
        className="p-2 rounded-md text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 mb-2"
        title={theme === 'dark' ? "Mode Gelap (Aktif)" : "Mode Terang (Aktif)"}
      >
        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </div>
  );
};

export default Toolbar;