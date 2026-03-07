# Personal Workspace
# Created for academic project purposes.
# Developed by: vedahanasta, OkaaJelantik,PandeJanuartha. 

A modern, privacy-focused, **Local-first** personal productivity dashboard. Built with React and powered by IndexedDB, this application keeps all your data strictly on your device—no cloud, no tracking, just your workflow.

## Live Demo

**[Open Personal Workspace](https://OkaaJelantik.github.io/personalworkspace/)**

## Features

-   **Markdown Notes:** Rich-text editing with full Markdown support using Tiptap.
-   **Todo Management:** Organize your tasks with priority, tags, and status tracking.
-   **Folder Organization:** Categorize your notes and tasks into custom folders for better structure.
-   **Real-time Clock:** Stay on track with an integrated workspace clock.
-   **Privacy-First (LocalDB):** All data is stored in your browser's IndexedDB. Your data never leaves your computer.

## Tech Stack

-   **Frontend:** [React 19](https://react.dev/)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Database:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via native browser API)
-   **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

To run this project locally, ensure you have [Node.js](https://nodejs.org/) installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/OkaaJelantik/personalworkspace.git
    cd personalworkspace
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

##  How it Works

This application utilizes **IndexedDB**, a low-level API for client-side storage of significant amounts of structured data. Unlike `localStorage`, IndexedDB allows for complex queries and handles larger datasets efficiently, making it perfect for a robust "offline-first" experience.

---

*Made for personal use and academic project.*

