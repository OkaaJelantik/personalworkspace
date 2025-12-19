import React from 'react';
import Clock from '../Clock'; // Import Clock

const Header = () => { // Removed tab-related props
  return (
    <header className="flex items-center justify-between px-4 border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
      {/* Empty div for spacing, allows clock to be pushed to the right */}
      <div></div> 
      <Clock />
    </header>
  );
};

export default Header;
