import React from 'react';
import TodoView from '../views/TodoView';
import MarkdownEditor from '../MarkdownEditor';
import TabBar from './TabBar';
import TagInput from '../ui/TagInput';

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
    <main className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
      <TabBar 
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={onSelectTab}
        onCloseTab={onCloseTab}
      />
      <div className="flex-grow overflow-hidden relative bg-white dark:bg-zinc-900">
        {renderContent()}
      </div>
    </main>
  );
};

export default WorkingArea;

const NoteView = ({ note, onUpdateNote }) => {
    return (
      // A single "page" container with a clear background and padding.
      <div className="h-full flex flex-col bg-white dark:bg-zinc-900 p-6 md:px-12 lg:px-24">
         {/* Title Area */}
         <div className="pb-4">
            <input 
                className="text-4xl font-bold bg-transparent border-none focus:outline-none w-full text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 py-2 leading-tight"
                value={note.title}
                onChange={(e) => onUpdateNote(note.id, { title: e.target.value })}
                placeholder="Judul Catatan..."
            />
            {/* Tag Input */}
            <TagInput 
                tags={note.tags || []} 
                onChange={(newTags) => onUpdateNote(note.id, { tags: newTags })} 
            />
         </div>
         
         <hr className="border-zinc-100 dark:border-zinc-800 mb-6" />

         {/* MarkdownEditor */}
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
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">{tab.title}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
            Selamat datang di Personal Workspace Anda. Pilih menu di sebelah kiri untuk memulai, atau buat catatan baru.
        </p>
    </div>
);
