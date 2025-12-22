import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const DialogContext = createContext();

export const useConfirm = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useConfirm must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Konfirmasi',
    cancelText: 'Batal',
    variant: 'danger'
  });

  const resolver = useRef(null);

  const confirm = useCallback((options) => {
    // Jika string diberikan sebagai argumen pertama, anggap itu message
    const config = typeof options === 'string' 
        ? { title: 'Konfirmasi', message: options } 
        : options;

    setDialogState({
      isOpen: true,
      title: config.title || 'Konfirmasi Tindakan',
      message: config.message || 'Apakah Anda yakin?',
      confirmText: config.confirmText || 'Ya, Lanjutkan',
      cancelText: config.cancelText || 'Batal',
      variant: config.variant || 'danger'
    });

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const handleConfirm = () => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
    if (resolver.current) {
      resolver.current(true);
    }
  };

  const handleCancel = () => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
    if (resolver.current) {
      resolver.current(false);
    }
  };

  return (
    <DialogContext.Provider value={confirm}>
      {children}
      <ConfirmDialog
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        variant={dialogState.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </DialogContext.Provider>
  );
};