# Personal Workspace Design Plan

## Phase: Implementation & Refinement

This document outlines the architecture and features of the Personal Workspace application as implemented.

## Core Features & Architecture

The application is a **local-first Single Page Application (SPA)** built with **React** and **Vite**, styled with **Tailwind CSS**. It provides two main functionalities: a sophisticated to-do list and a simple note-taking system.

### 1. Main Layout
The UI is composed of three main parts:
*   **Toolbar (Far Left):** A thin vertical bar with icons to toggle the main sidebar, open the To-do List, and **Toggle Theme (Dark/Light)**.
*   **Main Sidebar (Left):** A collapsible sidebar for note management, featuring a **Real-time Search Bar**.
*   **Working Area (Right):** The primary content area using a tab-based system. It employs a "Paper & Desk" aesthetic in light mode and "In-set Depth" in dark mode.

### 2. To-do List Module
The to-do list has been implemented as an advanced, Notion-style **Kanban Board**.
*   **View:** Opens in a dedicated "To-do List" tab.
*   **Columns:** Three status columns: "Belum dimulai", "Sedang berlangsung", and "Selesai".
*   **Cards:** Each to-do item is a card that can be dragged and dropped between columns.
*   **In-Card Editing:** Double-click to edit title/description, cycle priority, and set deadlines.
*   **Note Integration:** Associated long-form note page accessible via a slide-in modal.

### 3. Note-Taking Module
A robust system for general notes with a focus on organization and typography.
*   **Sidebar Integration:**
    *   **Search & Filter:** Find notes instantly by Title or **#Tags**.
    *   **Management:** Create new notes and delete existing ones with hover actions.
*   **Tagging System:**
    *   Supports inline tagging (e.g., `#work`, `#database`).
    *   Visual "Shine Blue" bold oval pills for high visibility.
    *   Intuitive creation via Enter/Space and deletion via Backspace.
*   **Tab-Based Editing:**
    *   Notes open in new tabs.
    *   **Optimized Typography:** Adjusted line-height and padding for large titles to ensure descenders (g, j, p, q, y) are not clipped.
    *   **Rich Text:** Integrated Markdown editor via Tiptap.

### 4. Rich Text Editor (Tiptap)
A shared `MarkdownEditor` component used throughout the app.
*   **Technology:** Built on the Tiptap framework.
*   **Features:** Formatting toolbar, placeholders, and full dark/light mode integration.