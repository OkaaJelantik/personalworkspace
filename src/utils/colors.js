// Generate consistent SUBTLE colors for badges
export const getCategoryColor = (category) => {
    if (!category) return 'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700';
  
    // Palet warna yang jauh lebih halus
    // Style: Text color kuat, Background sangat tipis/transparan, Border tipis.
    const palettes = [
      'text-red-600 bg-red-50 border-red-100 dark:text-red-400 dark:bg-red-900/10 dark:border-red-900/30',
      'text-orange-600 bg-orange-50 border-orange-100 dark:text-orange-400 dark:bg-orange-900/10 dark:border-orange-900/30',
      'text-amber-600 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-900/10 dark:border-amber-900/30',
      'text-emerald-600 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/10 dark:border-emerald-900/30',
      'text-teal-600 bg-teal-50 border-teal-100 dark:text-teal-400 dark:bg-teal-900/10 dark:border-teal-900/30',
      'text-cyan-600 bg-cyan-50 border-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/10 dark:border-cyan-900/30',
      'text-sky-600 bg-sky-50 border-sky-100 dark:text-sky-400 dark:bg-sky-900/10 dark:border-sky-900/30',
      'text-blue-600 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-900/10 dark:border-blue-900/30',
      'text-indigo-600 bg-indigo-50 border-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/10 dark:border-indigo-900/30',
      'text-violet-600 bg-violet-50 border-violet-100 dark:text-violet-400 dark:bg-violet-900/10 dark:border-violet-900/30',
      'text-purple-600 bg-purple-50 border-purple-100 dark:text-purple-400 dark:bg-purple-900/10 dark:border-purple-900/30',
      'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100 dark:text-fuchsia-400 dark:bg-fuchsia-900/10 dark:border-fuchsia-900/30',
      'text-pink-600 bg-pink-50 border-pink-100 dark:text-pink-400 dark:bg-pink-900/10 dark:border-pink-900/30',
      'text-rose-600 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-900/10 dark:border-rose-900/30',
    ];
  
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % palettes.length;
    return palettes[index];
  };