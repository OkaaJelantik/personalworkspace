import { useState, useEffect } from 'react';

/**
 * Custom hook untuk mengelola tema (Dark/Light Mode).
 * Strategi: Manual 'class' strategy.
 * 
 * 1. Cek localStorage ('theme').
 * 2. Jika kosong, cek preferensi sistem (window.matchMedia).
 * 3. Update class 'dark' di elemen <html>.
 * 4. Simpan perubahan ke localStorage.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // 1. Cek Local Storage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      
      // 2. Cek System Preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light'; // Default fallback
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Hapus class lama untuk mencegah konflik (opsional, tapi aman)
    root.classList.remove('light', 'dark');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light'); // Opsional, untuk styling spesifik light mode jika perlu
    }

    // Simpan ke storage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
