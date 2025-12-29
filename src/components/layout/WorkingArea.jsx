import React from 'react';
import TodoView from '../views/TodoView';
import MarkdownEditor from '../MarkdownEditor';
import TabBar from './TabBar';
import TagInput from '../ui/TagInput';

const WorkingArea = ({ tabs, activeTabId, onSelectTab, onCloseTab, onReorderTabs, activeTab, notes, onUpdateNote }) => {

  // 1. Zero State (No Tabs) -> Show Welcome Screen
  if (tabs.length === 0) {
    return (
      <main className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
        <WelcomeView tab={{ title: 'Personal Workspace' }} />
      </main>
    );
  }

  const renderContent = () => {
    if (!activeTab) return <div className="flex items-center justify-center h-full"><p className="text-zinc-500">No active tabs.</p></div>;

    switch (activeTab.type) {
      case 'welcome': // Keep for backward compatibility or explicit welcome tabs
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
        onReorderTabs={onReorderTabs}
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
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 p-4 md:px-12 lg:px-24">
      {/* Title Area */}
      <div className="pb-4">
        <input
          className="text-2xl md:text-4xl font-bold bg-transparent border-none focus:outline-none w-full text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 py-2 leading-tight"
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
  <div className="flex flex-col items-center justify-center h-full p-6 text-center select-none">
    <p className="text-[#6b7280] dark:text-zinc-400 text-xl font-medium italic z-10 opacity-90 -ml-4">
      "Lebih baik terlihat cupu daripada menjadi cepu"
    </p>
    <div className="max-w-xs w-full aspect-square -mt-8 flex items-center justify-center">
      <img
        src="/maskot.svg"
        alt="Mascot"
        className="w-full h-full object-contain opacity-90 dark:brightness-[1.8] dark:grayscale"
      />
    </div>
    <p className="text-zinc-400 dark:text-zinc-400 text-sm mt-2 font-medium italic -ml-4">
      — Veda Hanastaa, Ketua Guild.
    </p>
  </div>
);