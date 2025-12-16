import React from 'react';
import TodoList from './components/TodoList';
import Clock from './components/Clock';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Clock />
        <TodoList />
      </div>
    </ToastProvider>
  );
}

export default App;
