import React, { useState } from 'react';
import { Plus, Trash2, Search, X } from 'lucide-react';

const MainSidebar = ({ isVisible, notes, onAddNewNote, onDeleteNote, onSelectNote }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => {
    const query = searchQuery.toLowerCase();
    const matchTitle = note.title.toLowerCase().includes(query);
    const matchTags = (note.tags || []).some(tag => tag.toLowerCase().includes(query));
    return matchTitle || matchTags;
  });

  return (
    <aside 
      className={`bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out flex flex-col ${
        isVisible ? 'w-64 p-4' : 'w-0 p-0'
      }`}
    >
      <div className={`min-w-[14rem] flex-grow flex flex-col overflow-hidden ${!isVisible && 'hidden'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Notes</h2>
          <button 
            onClick={onAddNewNote} 
            className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
            title="Catatan Baru"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 group">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={14} />
          </div>
          <input
            type="text"
            placeholder="Cari catatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X size={14} />
            </button>
          )}
        </div>
        
        <div className="flex-grow overflow-y-auto -mr-4 pr-4 scrollbar-hide">
          {filteredNotes.length > 0 ? (
            <ul>
              {filteredNotes.map(note => (
                <li key={note.id} className="group mb-2 px-2 py-0.5 bg-white dark:bg-zinc-900 rounded-md shadow-sm border border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200">
                  <div
                    onClick={() => onSelectNote(note)}
                    className="flex justify-between items-center px-2 py-1 rounded-md cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <span className="text-sm truncate text-zinc-700 dark:text-zinc-300">{note.title || 'Untitled'}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteNote(note.id);
                      }}
                      className="p-1 rounded-md text-zinc-400 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Note"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500 mt-4 text-center">
              {searchQuery ? 'Tidak ada hasil ditemukan.' : 'Belum ada catatan.'}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default MainSidebar;
