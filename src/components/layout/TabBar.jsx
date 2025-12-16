import React from 'react';
import Tab from './Tab';

const TabBar = ({ tabs, activeTabId, onSelectTab, onCloseTab }) => {
  return (
    <div className="flex bg-slate-200 dark:bg-slate-700">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeTabId}
          onSelect={() => onSelectTab(tab.id)}
          onClose={() => onCloseTab(tab.id)}
        />
      ))}
    </div>
  );
};

export default TabBar;
