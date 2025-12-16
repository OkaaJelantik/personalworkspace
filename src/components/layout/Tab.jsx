import React from 'react';

const Tab = ({ tab, isActive, onSelect, onClose }) => {
  const activeClasses = 'bg-white dark:bg-slate-800 border-b-transparent';
  const inactiveClasses = 'bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500';

  return (
    <div
      onClick={onSelect}
      className={`flex items-center justify-between p-2 cursor-pointer border-r border-slate-300 dark:border-slate-600 ${isActive ? activeClasses : inactiveClasses}`}
    >
      <span className="mr-2 text-sm">{tab.title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent onSelect from firing
          onClose();
        }}
        className="text-xs rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-500 hover:text-white"
      >
        &#x2715;
      </button>
    </div>
  );
};

export default Tab;
