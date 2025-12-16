import React, { useState } from 'react';
import { ToastProvider } from './contexts/ToastContext';
import MainSidebar from './components/layout/MainSidebar';
import WorkingArea from './components/layout/WorkingArea';
import Header from './components/layout/Header';

function App() {
  const [tabs, setTabs] = useState([{ id: 'welcome', title: 'Welcome', type: 'welcome' }]);
  const [activeTabId, setActiveTabId] = useState('welcome');
  const [categories, setCategories] = useState([
    { id: 1, name: 'General', notes: [{ id: 101, title: 'My First Note' }] },
    { id: 2, name: 'Work', notes: [] }
  ]);

  const handleSelectTab = (tabId) => {
    setActiveTabId(tabId);
  };

  const handleCloseTab = (tabIdToClose) => {
    // Prevent closing the 'welcome' tab
    if (tabIdToClose === 'welcome') {
      return;
    }

    const tabIndex = tabs.findIndex(t => t.id === tabIdToClose);
    const newTabs = tabs.filter(t => t.id !== tabIdToClose);
    setTabs(newTabs);

    // If the closed tab was the active one, set a new active tab
    if (activeTabId === tabIdToClose) {
      const newActiveTab = newTabs[tabIndex] || newTabs[tabIndex - 1] || newTabs[0];
      if (newActiveTab) {
        setActiveTabId(newActiveTab.id);
      } else {
        // This case should ideally not be reached if we can't close the welcome tab
        setActiveTabId(null);
      }
    }
  };

  const openTodoListTab = () => {
    const todoTab = tabs.find(t => t.id === 'todo-list');
    if (todoTab) {
      setActiveTabId('todo-list');
    } else {
      const newTab = { id: 'todo-list', title: 'To-do List', type: 'todo' };
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
    }
  };
  
  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
        <Header 
          tabs={tabs}
          activeTabId={activeTabId}
          onSelectTab={handleSelectTab}
          onCloseTab={handleCloseTab}
          onOpenTodoList={openTodoListTab}
        />
        <div className="flex flex-row flex-grow">
          <MainSidebar categories={categories} />
          <WorkingArea activeTab={activeTab} />
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
