import React, { useState, useEffect } from 'react';
import { ToastProvider } from './contexts/ToastContext';
import MainSidebar from './components/layout/MainSidebar';
import WorkingArea from './components/layout/WorkingArea';
import Header from './components/layout/Header';
import Toolbar from './components/layout/Toolbar';
import { getNotes, addNote, updateNote, deleteNote, getFolders, addFolder, deleteFolder } from './services/db';
import { useTheme } from './hooks/useTheme';
import { useConfirm } from './contexts/DialogContext';

function App() {
  const confirm = useConfirm();
  // --- TAB PERSISTENCE LOGIC (Initial Load) ---
  const [tabs, setTabs] = useState(() => {
    const savedTabs = localStorage.getItem('workspace_tabs');
    if (savedTabs) {
        const parsed = JSON.parse(savedTabs);
        // Filter out any legacy 'welcome' tabs
        return parsed.filter(t => t.id !== 'welcome' && t.type !== 'welcome');
    }
    return []; 
  });

  const [activeTabId, setActiveTabId] = useState(() => {
    return localStorage.getItem('workspace_active_tab') || null; // Default to null
  });

  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]); // New Folders State
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  // Theme Hook
  const { theme, toggleTheme } = useTheme();

  // --- Initial Data Loading ---
  useEffect(() => {
    const loadData = async () => {
      const [notesFromDB, foldersFromDB] = await Promise.all([getNotes(), getFolders()]);
      setNotes(notesFromDB);
      setFolders(foldersFromDB || []);
    };
    loadData();
  }, []);

  // --- TAB PERSISTENCE LOGIC (Auto-Save) ---
  useEffect(() => {
    localStorage.setItem('workspace_tabs', JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    localStorage.setItem('workspace_active_tab', activeTabId);
  }, [activeTabId]);

  // --- Handlers ---
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSelectTab = (tabId) => {
    setActiveTabId(tabId);
  };

  const handleReorderTabs = (newTabs) => {
    setTabs(newTabs);
  };

  const handleCloseTab = (tabIdToClose) => {
    const tabIndex = tabs.findIndex(t => t.id === tabIdToClose);
    const newTabs = tabs.filter(t => t.id !== tabIdToClose);
    
    setTabs(newTabs);

    // Jika tab aktif yang ditutup
    if (activeTabId === tabIdToClose) {
        if (newTabs.length === 0) {
            setActiveTabId(null);
        } else {
            const newActiveTab = newTabs[tabIndex] || newTabs[tabIndex - 1] || newTabs[0];
            setActiveTabId(newActiveTab?.id || null);
        }
    }
  };
  
  // --- Folder Handlers ---
  const handleAddFolder = async (name) => {
    const newFolder = await addFolder({ name });
    setFolders([...folders, newFolder]);
  };

  const handleDeleteFolder = async (folderId) => {
    if (await confirm({
        title: 'Hapus Folder?',
        message: 'Catatan di dalamnya akan menjadi tanpa kategori. Tindakan ini tidak bisa dibatalkan.',
        confirmText: 'Hapus Folder',
        variant: 'danger'
    })) {
        await deleteFolder(folderId);
        setFolders(folders.filter(f => f.id !== folderId));
        setNotes(notes.map(n => n.folderId === folderId ? { ...n, folderId: null } : n));
        notes.filter(n => n.folderId === folderId).forEach(n => updateNote({ ...n, folderId: null }));
    }
  };

  // --- Note Handlers ---
  const handleAddNewNote = async (folderId = null) => {
    const newNote = await addNote({ folderId }); // Creates a note with folderId
    setNotes([newNote, ...notes]);
    openNoteInTab(newNote); // Open it in a new tab
  };

  const handleUpdateNote = async (noteId, updatedFields) => {
    const noteToUpdate = notes.find(n => n.id === noteId);
    if (!noteToUpdate) return;
    
    const updatedNote = { ...noteToUpdate, ...updatedFields };
    await updateNote(updatedNote);

    // Update state for notes and tabs
    setNotes(notes.map(n => n.id === noteId ? updatedNote : n));
    setTabs(tabs.map(t => t.id === `note-${noteId}` ? { ...t, title: updatedNote.title || 'Untitled' } : t));
  };

  const handleDeleteNote = async (noteId) => {
    if (await confirm({
        title: 'Hapus Catatan?',
        message: 'Catatan ini akan dihapus secara permanen dari database lokal Anda.',
        confirmText: 'Hapus Catatan'
    })) {
        await deleteNote(noteId);
        setNotes(notes.filter(n => n.id !== noteId));
        handleCloseTab(`note-${noteId}`);
    }
  };

  // --- Tab Management ---
  const toggleTodoListTab = () => {
    const todoTabId = 'todo-list';
    
    // Toggle Logic: Close if currently active
    if (activeTabId === todoTabId) {
        handleCloseTab(todoTabId);
        return;
    }

    if (tabs.find(t => t.id === todoTabId)) {
      setActiveTabId(todoTabId);
    } else {
      const newTab = { id: todoTabId, title: 'To-do List', type: 'todo' };
      setTabs([...tabs, newTab]);
      setActiveTabId(todoTabId);
    }
  };

  const handleCloseAllTabs = async () => {
    if (tabs.length === 0) return;
    if (await confirm({
        title: 'Tutup Semua Tab?',
        message: 'Semua tab yang terbuka akan ditutup. Catatan Anda tetap tersimpan di sidebar.',
        confirmText: 'Tutup Semua',
        variant: 'blue' // Using a different variant for less destructive actions
    })) {
        setTabs([]);
        setActiveTabId(null);
    }
  };

  const openNoteInTab = (note) => {
    const tabId = `note-${note.id}`;
    if (tabs.find(t => t.id === tabId)) {
      setActiveTabId(tabId);
    } else {
      const newTab = {
        id: tabId,
        title: note.title || 'Untitled',
        type: 'note',
        noteId: note.id,
      };
      setTabs([...tabs, newTab]);
      setActiveTabId(newTab.id);
    }
  };
  
  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <ToastProvider>
      <div className="flex flex-row min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200">
        <Toolbar 
          onToggleSidebar={toggleSidebar}
          onToggleTodoList={toggleTodoListTab}
          onCloseAllTabs={handleCloseAllTabs}
          isSidebarVisible={isSidebarVisible}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <div className="flex-1 flex flex-col relative h-screen overflow-hidden">
          <Header />
          <div className="flex flex-row flex-grow overflow-hidden relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarVisible && (
              <div 
                className="fixed inset-0 bg-black/50 z-20 md:hidden" 
                onClick={() => setIsSidebarVisible(false)}
              />
            )}
            
            <div className={`
              ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} 
              absolute md:relative z-30 h-full transition-transform duration-300 ease-in-out md:transform-none
            `}>
                <MainSidebar 
                  isVisible={true} // Always render internal content, visibility handled by parent class
                  notes={notes}
                  folders={folders}
                  onAddNewNote={handleAddNewNote}
                  onDeleteNote={handleDeleteNote}
                  onSelectNote={(note) => {
                    openNoteInTab(note);
                    if (window.innerWidth < 768) setIsSidebarVisible(false); // Close on mobile selection
                  }}
                  onAddFolder={handleAddFolder}
                  onDeleteFolder={handleDeleteFolder}
                  onUpdateNote={handleUpdateNote}
                />
            </div>

            <WorkingArea 
              tabs={tabs}
              activeTabId={activeTabId}
              onSelectTab={handleSelectTab}
              onCloseTab={handleCloseTab}
              onReorderTabs={handleReorderTabs}
              activeTab={activeTab}
              notes={notes}
              onUpdateNote={handleUpdateNote}
            />
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
