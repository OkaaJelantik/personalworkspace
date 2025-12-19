import React from 'react';

const Tab = ({ tab, isActive, onSelect, onClose }) => {
  const baseClasses = 'flex items-center justify-between p-2 cursor-pointer border-r border-slate-300 dark:border-slate-700 rounded-t-md border-t border-x';
  
  const activeClasses = 'bg-white dark:bg-slate-800 border-b-white dark:border-b-slate-800 -mb-px';
  const inactiveClasses = 'bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 border-transparent';

  // The 'welcome' tab should not have a close button
  const canBeClosed = tab.id !== 'welcome';

  return (
    <div
      onClick={onSelect}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <span className="mr-2 text-sm">{tab.title}</span>
      {canBeClosed && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent onSelect from firing
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
