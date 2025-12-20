import React from 'react';
import TodoView from '../views/TodoView';
import MarkdownEditor from '../MarkdownEditor';
import TabBar from './TabBar';

const WorkingArea = ({ tabs, activeTabId, onSelectTab, onCloseTab, activeTab, notes, onUpdateNote }) => {
  
  const renderContent = () => {
    if (!activeTab) return <div className="flex items-center justify-center h-full"><p className="text-zinc-500">No active tabs.</p></div>;

    switch (activeTab.type) {
      case 'welcome':
        return <WelcomeView tab={activeTab} />;
      case 'todo':
        return <TodoView />;
      case 'note': {
        const note = notes.find(n => n.id === activeTab.noteId);
        if (!note) return <div className="flex items-center justify-center h-full p-4"><p className="text-zinc-500">Note not found.</p></div>;
        return <NoteView note={note} onUpdateNote={onUpdateNote} />;
      }
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-zinc-200 dark:bg-zinc-900">
      <TabBar 
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={onSelectTab}
        onCloseTab={onCloseTab}
      />
      <div className="flex-grow overflow-hidden relative bg-zinc-100 dark:bg-zinc-800">
        {renderContent()}
      </div>
    </main>
  );
};

export default WorkingArea;

const NoteView = ({ note, onUpdateNote }) => {
    return (
      // A single "page" container with a clear background and padding.
      <div className="h-full flex flex-col bg-zinc-100 dark:bg-zinc-800 p-6">
         {/* Title Area */}
         <div className="pb-6">
            <input 
                className="text-4xl font-bold bg-transparent border-none focus:outline-none w-full text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-500"
                value={note.title}
                onChange={(e) => onUpdateNote(note.id, { title: e.target.value })}
                placeholder="Judul Catatan..."
            />
         </div>
         
         {/* MarkdownEditor will inherit the background */}
         <div className="flex-1 flex flex-col overflow-y-auto">
            <MarkdownEditor
                key={note.id}
                content={note.content}
                onUpdate={(newContent) => onUpdateNote(note.id, { content: newContent })}
            />
         </div>
      </div>
    );
}

const WelcomeView = ({ tab }) => (
    <div className="p-6">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{tab.title}</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">Welcome to your Personal Workspace.</p>
    </div>
);