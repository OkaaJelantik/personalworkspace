import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const MainSidebar = ({ isVisible, notes, onAddNewNote, onDeleteNote, onSelectNote }) => {
  return (
    <aside 
      className={`bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out flex flex-col ${
        isVisible ? 'w-64 p-4' : 'w-0 p-0'
      }`}
    >
      <div className={`min-w-[14rem] flex-grow flex flex-col overflow-hidden ${!isVisible && 'hidden'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Notes</h2>
          <button 
            onClick={onAddNewNote} 
            className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500"
            title="Catatan Baru"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto -mr-4 pr-4 scrollbar-hide">
          {notes && notes.length > 0 ? (
            <ul>
              {notes.map(note => (
                <li key={note.id} className="group mb-2 px-2 py-0.5 bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-sm border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200">
                  <div
                    onClick={() => onSelectNote(note)}
                    className="flex justify-between items-center px-2 py-1 rounded-md cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
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
            <p className="text-sm text-zinc-500 mt-4 text-center">Belum ada catatan.</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default MainSidebar;
