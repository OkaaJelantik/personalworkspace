import React, { useState, useEffect } from 'react';
import { ToastProvider } from './contexts/ToastContext';
import MainSidebar from './components/layout/MainSidebar';
import WorkingArea from './components/layout/WorkingArea';
import Header from './components/layout/Header';
import Toolbar from './components/layout/Toolbar';
import { getNotes, addNote, updateNote, deleteNote } from './services/db';
import { useTheme } from './hooks/useTheme';

function App() {
  // --- TAB PERSISTENCE LOGIC (Initial Load) ---
  const [tabs, setTabs] = useState(() => {
    const savedTabs = localStorage.getItem('workspace_tabs');
    return savedTabs ? JSON.parse(savedTabs) : [{ id: 'welcome', title: 'Welcome', type: 'welcome' }];
  });

  const [activeTabId, setActiveTabId] = useState(() => {
    return localStorage.getItem('workspace_active_tab') || 'welcome';
  });

  const [notes, setNotes] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  // Theme Hook
  const { theme, toggleTheme } = useTheme();

  // --- Initial Data Loading ---
  useEffect(() => {
    const loadNotes = async () => {
      const notesFromDB = await getNotes();
      setNotes(notesFromDB);
    };
    loadNotes();
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

  const handleCloseTab = (tabIdToClose) => {
    if (tabIdToClose === 'welcome' && tabs.length === 1) return;

    const tabIndex = tabs.findIndex(t => t.id === tabIdToClose);
    const newTabs = tabs.filter(t => t.id !== tabIdToClose);
    
    // Jika semua tab ditutup, buka tab welcome
    if (newTabs.length === 0) {
        setTabs([{ id: 'welcome', title: 'Welcome', type: 'welcome' }]);
        setActiveTabId('welcome');
        return;
    }

    setTabs(newTabs);

    if (activeTabId === tabIdToClose) {
      const newActiveTab = newTabs[tabIndex] || newTabs[tabIndex - 1] || newTabs[0];
      setActiveTabId(newActiveTab?.id || null);
    }
  };
  
  // --- Note Handlers ---
  const handleAddNewNote = async () => {
    const newNote = await addNote({}); // Creates a note with defaults
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
    if (window.confirm('Hapus catatan ini?')) {
        await deleteNote(noteId);
        setNotes(notes.filter(n => n.id !== noteId));
        handleCloseTab(`note-${noteId}`);
    }
  };

  // --- Tab Management ---
  const openTodoListTab = () => {
    const todoTabId = 'todo-list';
    if (tabs.find(t => t.id === todoTabId)) {
      setActiveTabId(todoTabId);
    } else {
      const newTab = { id: todoTabId, title: 'To-do List', type: 'todo' };
      setTabs([...tabs, newTab]);
      setActiveTabId(todoTabId);
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
          onOpenTodoList={openTodoListTab}
          isSidebarVisible={isSidebarVisible}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex flex-row flex-grow overflow-hidden">
            <MainSidebar 
              isVisible={isSidebarVisible} 
              notes={notes}
              onAddNewNote={handleAddNewNote}
              onDeleteNote={handleDeleteNote}
              onSelectNote={openNoteInTab}
            />
            <WorkingArea 
              tabs={tabs}
              activeTabId={activeTabId}
              onSelectTab={handleSelectTab}
              onCloseTab={handleCloseTab}
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