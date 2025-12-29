import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, X, Folder, ChevronRight, ChevronDown, FolderPlus, Pencil } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MainSidebar = ({ isVisible, notes, folders, onAddNewNote, onDeleteNote, onSelectNote, onAddFolder, onDeleteFolder, onUpdateNote, onUpdateFolder }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFolders, setExpandedFolders] = useState({}); // Current UI state
  const [manualExpandedFolders, setManualExpandedFolders] = useState({}); // Backup of user's manual toggles
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editingFolderName, setEditingFolderName] = useState('');

  // Auto-expand folders on search & Restore on clear
  useEffect(() => {
    if (!searchQuery.trim()) {
        // When search is cleared, restore the manual state
        setExpandedFolders(manualExpandedFolders);
        return;
    }

    const query = searchQuery.toLowerCase();
    const newExpandedState = { ...expandedFolders };
    let hasChanges = false;

    folders.forEach(folder => {
        const folderNotes = notes.filter(n => n.folderId === folder.id);
        const hasMatch = folderNotes.some(note => {
            const matchTitle = note.title.toLowerCase().includes(query);
            const matchTags = (note.tags || []).some(tag => tag.toLowerCase().includes(query));
            return matchTitle || matchTags;
        });

        if (hasMatch && !newExpandedState[folder.id]) {
            newExpandedState[folder.id] = true;
            hasChanges = true;
        }
    });

    if (hasChanges) {
        setExpandedFolders(newExpandedState);
    }
  }, [searchQuery, notes, folders]);

  const toggleFolder = (folderId) => {
    const newState = !expandedFolders[folderId];
    setExpandedFolders(prev => ({ ...prev, [folderId]: newState }));
    
    // Only save to manual state if the user is NOT currently searching
    if (!searchQuery.trim()) {
        setManualExpandedFolders(prev => ({ ...prev, [folderId]: newState }));
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onAddFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreatingFolder(false);
    }
  };

  const handleRenameFolder = (folderId) => {
    if (editingFolderName.trim()) {
      onUpdateFolder(folderId, { name: editingFolderName.trim() });
    }
    setEditingFolderId(null);
    setEditingFolderName('');
  };

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    // Check if location hasn't changed
    if (destination.droppableId === result.source.droppableId && destination.index === result.source.index) {
        return;
    }

    const noteId = parseInt(draggableId.replace('note-', ''));
    const targetFolderId = destination.droppableId === 'uncategorized' ? null : parseInt(destination.droppableId.replace('folder-', ''));

    // Optimistic UI Update handled by parent re-render via onUpdateNote, 
    // but drag-drop lib needs state to be stable. 
    // Ideally we update local state too, but relying on parent prop update is safer for data consistency.
    onUpdateNote(noteId, { folderId: targetFolderId });
  };

  // Group notes by folder
  const groupedNotes = {
    uncategorized: [],
    ...folders.reduce((acc, folder) => ({ ...acc, [folder.id]: [] }), {})
  };

  // Filter notes first
  const filteredNotes = notes.filter(note => {
    const query = searchQuery.toLowerCase();
    const matchTitle = note.title.toLowerCase().includes(query);
    const matchTags = (note.tags || []).some(tag => tag.toLowerCase().includes(query));
    return matchTitle || matchTags;
  });

  // Distribute filtered notes into groups
  filteredNotes.forEach(note => {
    if (note.folderId && groupedNotes[note.folderId]) {
      groupedNotes[note.folderId].push(note);
    } else {
      groupedNotes.uncategorized.push(note);
    }
  });

  return (
    <aside 
      className="bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col w-64 h-full"
    >
      <div className="flex flex-col h-full">
        
        {/* HEADER: Title & Add Note */}
        <div className="p-4 pb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Explorer</h2>
          <div className="flex gap-1">
             <button 
                onClick={() => setIsCreatingFolder(true)} 
                className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                title="Folder Baru"
              >
                <FolderPlus size={16} />
              </button>
              <button 
                onClick={() => onAddNewNote(null)} 
                className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                title="Catatan Baru (Tanpa Folder)"
              >
                <Plus size={16} />
              </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="px-4 pb-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-500 transition-colors">
              <Search size={14} />
            </div>
            <input
              type="text"
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-8 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
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
        </div>

        {/* CREATE FOLDER INPUT */}
        {isCreatingFolder && (
          <div className="px-4 pb-2 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-blue-500 rounded-md px-2 py-1">
               <Folder size={14} className="text-blue-500" />
               <input 
                 autoFocus
                 type="text" 
                 value={newFolderName}
                 onChange={(e) => setNewFolderName(e.target.value)}
                 onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateFolder();
                    if (e.key === 'Escape') setIsCreatingFolder(false);
                 }}
                 onBlur={() => { if(!newFolderName) setIsCreatingFolder(false); }}
                 placeholder="Nama Folder..." 
                 className="w-full bg-transparent text-sm focus:outline-none"
               />
            </div>
          </div>
        )}
        
        {/* LIST CONTENT */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-hide space-y-1">
          <DragDropContext onDragEnd={onDragEnd}>
            {/* FOLDERS LOOP */}
            {folders.map(folder => (
              <div key={folder.id} className="select-none">
                  {/* FOLDER HEADER (Droppable Target) */}
                  <Droppable droppableId={`folder-${folder.id}`} type="NOTE">
                    {(provided, snapshot) => (
                       <div 
                           ref={provided.innerRef} 
                           {...provided.droppableProps}
                           className={cn(
                               "rounded-md transition-colors",
                               snapshot.isDraggingOver ? "bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500/50" : ""
                           )}
                       >
                            <div 
                                className="group flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                                onClick={() => toggleFolder(folder.id)}
                            >
                                <div className="flex items-center gap-2 overflow-hidden flex-1">
                                    {expandedFolders[folder.id] ? <ChevronDown size={14} className="text-zinc-400" /> : <ChevronRight size={14} className="text-zinc-400" />}
                                    
                                    {editingFolderId === folder.id ? (
                                      <input 
                                        autoFocus
                                        type="text"
                                        value={editingFolderName}
                                        onChange={(e) => setEditingFolderName(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') handleRenameFolder(folder.id);
                                          if (e.key === 'Escape') setEditingFolderId(null);
                                        }}
                                        onBlur={() => handleRenameFolder(folder.id)}
                                        className="bg-white dark:bg-zinc-900 border border-blue-500 rounded px-1 w-full text-sm focus:outline-none"
                                      />
                                    ) : (
                                      <>
                                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">{folder.name}</span>
                                        <span className="text-xs text-zinc-400">({groupedNotes[folder.id]?.length || 0})</span>
                                      </>
                                    )}
                                </div>
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                    <button 
                                        onClick={(e) => { 
                                          e.stopPropagation(); 
                                          setEditingFolderId(folder.id); 
                                          setEditingFolderName(folder.name); 
                                        }}
                                        className="p-1 hover:text-blue-600 text-zinc-400"
                                        title="Ubah Nama Folder"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onAddNewNote(folder.id); setExpandedFolders(p => ({...p, [folder.id]: true})); }}
                                        className="p-1 hover:text-blue-600 text-zinc-400"
                                        title="Tambah Catatan di sini"
                                    >
                                        <Plus size={14} />
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDeleteFolder(folder.id); }}
                                        className="p-1 hover:text-red-600 text-zinc-400"
                                        title="Hapus Folder"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* FOLDER NOTES (Also Draggable items inside) */}
                            {expandedFolders[folder.id] && (
                                <div className="ml-6 border-l border-zinc-200 dark:border-zinc-800 pl-2 mt-1 space-y-0.5 min-h-[5px]">
                                    {groupedNotes[folder.id]?.length > 0 ? (
                                        groupedNotes[folder.id].map((note, index) => (
                                            <Draggable key={note.id} draggableId={`note-${note.id}`} index={index}>
                                                {(provided, snapshot) => (
                                                    <NoteItem 
                                                        note={note} 
                                                        onSelect={onSelectNote} 
                                                        onDelete={onDeleteNote}
                                                        provided={provided}
                                                        isDragging={snapshot.isDragging}
                                                    />
                                                )}
                                            </Draggable>
                                        ))
                                    ) : (
                                        <div className="text-xs text-zinc-400 italic py-1 px-2 pointer-events-none">Folder kosong</div>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                            {/* Hidden placeholder if collapsed to keep DND working correctly? No, placeholder should be inside the list */}
                            {!expandedFolders[folder.id] && <div className="hidden">{provided.placeholder}</div>}
                       </div>
                    )}
                  </Droppable>
              </div>
            ))}

            {/* UNCATEGORIZED AREA */}
            <div className="mt-4">
                 {folders.length > 0 && (
                    <div className="px-2 py-1 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                        Lainnya
                    </div>
                 )}
                 <Droppable droppableId="uncategorized" type="NOTE">
                    {(provided, snapshot) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={cn(
                                "space-y-0.5 min-h-[50px] rounded-md transition-colors",
                                snapshot.isDraggingOver ? "bg-zinc-100 dark:bg-zinc-800/50 ring-1 ring-zinc-300 dark:ring-zinc-700" : ""
                            )}
                        >
                            {groupedNotes.uncategorized.map((note, index) => (
                                <Draggable key={note.id} draggableId={`note-${note.id}`} index={index}>
                                    {(provided, snapshot) => (
                                        <NoteItem 
                                            note={note} 
                                            onSelect={onSelectNote} 
                                            onDelete={onDeleteNote} 
                                            provided={provided}
                                            isDragging={snapshot.isDragging}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {groupedNotes.uncategorized.length === 0 && !snapshot.isDraggingOver && (
                                <div className="h-4" /> 
                            )}
                        </div>
                    )}
                 </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </aside>
  );
};

// Sub-component for individual note item
const NoteItem = ({ note, onSelect, onDelete, provided, isDragging }) => (
  <div 
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={provided.draggableProps.style}
    className={cn(
        "group relative flex items-center justify-between px-2 py-1.5 rounded-md cursor-grab active:cursor-grabbing transition-all",
        isDragging 
            ? "bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-blue-500 rotate-2 z-50 opacity-90" 
            : "hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
    )}
  >
    <div onClick={() => onSelect(note)} className="flex-1 overflow-hidden">
        <div className="text-sm text-zinc-700 dark:text-zinc-300 truncate">{note.title || 'Tanpa Judul'}</div>
    </div>
    <button 
        onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
        className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-500 transition-opacity"
    >
        <Trash2 size={12} />
    </button>
  </div>
);

export default MainSidebar;