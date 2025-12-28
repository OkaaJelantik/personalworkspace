// src/contexts/ToastContext.jsx
import React, { createContext, useState, useContext } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: '', show: false });

  const showToast = (message) => {
    setToast({ message, show: true });
  };

  const hideToast = () => {
    setToast({ message: '', show: false });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toast.message} show={toast.show} onClose={hideToast} />
    </ToastContext.Provider>
  );
}
