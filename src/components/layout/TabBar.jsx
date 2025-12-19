import React from 'react';
import Tab from './Tab';

const TabBar = ({ tabs, activeTabId, onSelectTab, onCloseTab }) => {
  return (
    <div className="flex border-b border-slate-300 dark:border-slate-700">
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
