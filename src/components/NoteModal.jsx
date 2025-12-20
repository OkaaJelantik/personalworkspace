import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const NoteModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: show ? 1 : 0 }}
        onClick={onClose}
      ></div>

      {/* Modal Content - Right Floating Window */}
      <div
        ref={modalRef}
        className={`relative w-1/2 max-w-4xl h-full bg-zinc-100 dark:bg-zinc-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          show ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 flex flex-col h-full">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;