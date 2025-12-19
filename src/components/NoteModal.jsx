import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const NoteModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // This effect handles the slide-in animation
    if (isOpen) {
      // Use a timeout to allow the component to mount before transitioning
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
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: show ? 1 : 0 }}
        onClick={onClose}
      ></div>

      {/* Modal Content - Right Floating Window */}
      <div
        ref={modalRef}
        className={`relative w-1/2 h-full bg-slate-50 dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          show ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {children}
        </div>
      </div>
    </div>,
    document.body // Portal into the body to avoid z-index issues
  );
};

export default NoteModal;
