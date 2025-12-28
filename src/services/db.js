// src/services/db.js

const DB_NAME = 'PersonalWorkspaceDB';
const DB_VERSION = 3; // INCREMENTED VERSION
const TODO_STORE_NAME = 'todos';
const NOTE_STORE_NAME = 'notes';
const FOLDER_STORE_NAME = 'folders'; // New store for folders

let db;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(TODO_STORE_NAME)) {
        db.createObjectStore(TODO_STORE_NAME, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(NOTE_STORE_NAME)) {
        const noteStore = db.createObjectStore(NOTE_STORE_NAME, { keyPath: 'id' });
        noteStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
      // New Folders Store
      if (!db.objectStoreNames.contains(FOLDER_STORE_NAME)) {
        db.createObjectStore(FOLDER_STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
}

// --- Todo Functions ---
async function getTodos() {
  if (!db) db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TODO_STORE_NAME, 'readonly');
    const store = transaction.objectStore(TODO_STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function addTodo(todo) {
  if (!db) db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TODO_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(TODO_STORE_NAME);
    const newTodo = {
      ...todo,
      status: todo.status || 'upcoming',
      tags: todo.tags || [],
      priority: todo.priority || 'Medium',
      description: '',
      createdAt: Date.now()
    };
    const request = store.add(newTodo);
    request.onsuccess = () => resolve(newTodo);
    request.onerror = () => reject(request.error);
  });
}

async function updateTodo(todo) {
  if (!db) db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TODO_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(TODO_STORE_NAME);
    const request = store.put(todo);
    request.onsuccess = () => resolve(todo);
    request.onerror = () => reject(request.error);
  });
}

async function deleteTodo(id) {
  if (!db) db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TODO_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(TODO_STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve(id);
    request.onerror = () => reject(request.error);
  });
}

// --- Folder Functions (NEW) ---
async function getFolders() {
    if (!db) db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(FOLDER_STORE_NAME, 'readonly');
      const store = transaction.objectStore(FOLDER_STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
}

async function addFolder(folder) {
    if (!db) db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(FOLDER_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(FOLDER_STORE_NAME);
        const newFolder = {
            id: Date.now(),
            name: 'New Folder',
            createdAt: Date.now(),
            ...folder,
        };
        const request = store.add(newFolder);
        request.onsuccess = () => resolve(newFolder);
        request.onerror = () => reject(request.error);
    });
}

async function deleteFolder(id) {
    if (!db) db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(FOLDER_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(FOLDER_STORE_NAME);
        const request = store.delete(id);
        request.onsuccess = () => resolve(id);
        request.onerror = () => reject(request.error);
    });
}

// --- Note Functions ---
async function getNotes() {
    if (!db) db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(NOTE_STORE_NAME, 'readonly');
      const store = transaction.objectStore(NOTE_STORE_NAME);
      const index = store.index('updatedAt');
      const request = index.getAll(); // This will get all notes sorted by updatedAt
      request.onsuccess = () => resolve(request.result.reverse()); // Reverse to get most recent first
      request.onerror = () => reject(request.error);
    });
}
  
async function addNote(note) {
    if (!db) db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(NOTE_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(NOTE_STORE_NAME);
        const newNote = {
            id: Date.now(),
            title: 'Catatan Tanpa Judul',
            content: '', 
            tags: [], 
            subtasks: [], 
            folderId: note.folderId || null, // Add folderId support
            createdAt: Date.now(),
            updatedAt: Date.now(),
            ...note,
        };
        const request = store.add(newNote);
        request.onsuccess = () => resolve(newNote);
        request.onerror = () => reject(request.error);
    });
}
  
async function updateNote(note) {
    if (!db) db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(NOTE_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(NOTE_STORE_NAME);
        const updatedNote = { ...note, updatedAt: Date.now() };
        const request = store.put(updatedNote);
        request.onsuccess = () => resolve(updatedNote);
        request.onerror = () => reject(request.error);
    });
}

async function deleteNote(id) {
    if (!db) db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(NOTE_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(NOTE_STORE_NAME);
        const request = store.delete(id);
        request.onsuccess = () => resolve(id);
        request.onerror = () => reject(request.error);
    });
}


export { 
    openDatabase, 
    getTodos, addTodo, updateTodo, deleteTodo,
    getNotes, addNote, updateNote, deleteNote,
    getFolders, addFolder, deleteFolder // Export new functions
};