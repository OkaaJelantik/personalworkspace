import React, { useState } from 'react';

const TagInput = ({ tags = [], onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const trimmedInput = inputValue.trim();
      
      if (trimmedInput) {
        const formattedTag = trimmedInput.startsWith('#') ? trimmedInput : `#${trimmedInput}`;
        if (!tags.includes(formattedTag)) {
          onChange([...tags, formattedTag]);
        }
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-2">
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className="inline-flex items-center px-4 py-1 text-xs font-bold rounded-full transition-all duration-200
                     /* Light Mode: Biru Ringan Shine */
                     bg-blue-50 text-blue-600 border border-blue-100 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.3)]
                     /* Dark Mode: Deep Blue Glow */
                     dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 dark:shadow-[0_0_12px_-4px_rgba(59,130,246,0.5)]"
        >
          {tag}
        </span>
      ))}
      
      <div className="flex items-center gap-1.5 ml-1">
        <span className="text-blue-500 dark:text-blue-400 font-bold text-sm select-none">+</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Tambahkan tag..." : "tag"}
          className="min-w-[80px] max-w-xs bg-transparent text-sm font-medium text-zinc-500 dark:text-zinc-400 placeholder-zinc-300 dark:placeholder-zinc-700 focus:outline-none py-1"
        />
      </div>
    </div>
  );
};

export default TagInput;
