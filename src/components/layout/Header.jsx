import React from 'react';
import Clock from '../Clock';

const Header = () => {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      {/* Empty div for spacing, allows clock to be pushed to the right */}
      <div></div> 
      <Clock />
    </header>
  );
};

export default Header;
