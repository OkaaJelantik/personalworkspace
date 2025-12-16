import React from 'react';
import UtilityBar from './UtilityBar';
import TabBar from './TabBar';

const Header = ({ onOpenTodoList, tabs, activeTabId, onSelectTab, onCloseTab }) => {
  return (
    <header className="flex items-center border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
      <UtilityBar onOpenTodoList={onOpenTodoList} />
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={onSelectTab}
        onCloseTab={onCloseTab}
      />
    </header>
  );
};

export default Header;
