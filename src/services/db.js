// src/services/db.js

const DB_NAME = 'PersonalWorkspaceDB';
const DB_VERSION = 1;
const TODO_STORE_NAME = 'todos';

let db;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(TODO_STORE_NAME)) {
        db.createObjectStore(TODO_STORE_NAME, { keyPath: 'id' });
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
    const request = store.add(todo);

    request.onsuccess = () => resolve(todo);
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

export { openDatabase, getTodos, addTodo, updateTodo, deleteTodo };
