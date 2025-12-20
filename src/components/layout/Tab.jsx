import React from 'react';

const Tab = ({ tab, isActive, onSelect, onClose }) => {
  const baseClasses = 'flex items-center justify-between px-4 py-2 cursor-pointer border-r border-zinc-200 dark:border-zinc-700 min-w-[120px] max-w-[200px] select-none rounded-t-lg';
  
  // Active: Blends with Working Area (Lightest) by removing the bottom border visually
  const activeClasses = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold border-b-transparent';
  
  // Inactive: Sits on the bar background
  const inactiveClasses = 'bg-zinc-200 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-300/60 dark:hover:bg-zinc-700 border-b-zinc-200 dark:border-b-zinc-800';

  const canBeClosed = tab.id !== 'welcome';

  return (
    <div
      onClick={onSelect}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <span className="mr-2 text-sm truncate">{tab.title}</span>
      {canBeClosed && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-xs rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-500 hover:text-white"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
};

export default Tab;
