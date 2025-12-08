import React from 'react';

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-800">
      <header className="p-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Personal Workspace
        </h1>
      </header>
      <main className="flex-grow flex justify-center items-center">
        <p className="text-lg">
          Vite + React + Tailwind CSS setup is complete. Ready to build!
        </p>
      </main>
      <footer className="p-4 text-center text-sm text-gray-500">
        <p>Built with ❤️</p>
      </footer>
    </div>
  );
}

export default App;
