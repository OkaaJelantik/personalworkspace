import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Konfirmasi", cancelText = "Batal", variant = "danger" }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        onConfirm();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onConfirm, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={dialogRef}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 transform scale-100 animate-in zoom-in-95 duration-200"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onKeyDown={(e) => {
            if (e.key === 'Escape') onCancel();
        }}
      >
        <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-full flex-shrink-0 ${variant === 'danger' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                <AlertTriangle size={24} />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-none mb-2">{title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{message}</p>
            </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
            <button 
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            >
                {cancelText}
            </button>
            <button 
                onClick={onConfirm}
                autoFocus
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-colors ${
                    variant === 'danger' 
                    ? 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {confirmText}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;