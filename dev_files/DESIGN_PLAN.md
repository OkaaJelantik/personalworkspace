# Personal Workspace Design Plan

## Phase: Implementation & Refinement

This document outlines the architecture and features of the Personal Workspace application as implemented.

## Core Features & Architecture

The application is a **local-first Single Page Application (SPA)** built with **React** and **Vite**, styled with **Tailwind CSS**. It provides two main functionalities: a sophisticated to-do list and a simple note-taking system.

### 1. Main Layout
The UI is composed of three main parts:
*   **Toolbar (Far Left):** A thin vertical bar with icons to toggle the main sidebar and open the To-do List view.
*   **Main Sidebar (Left):** A collapsible sidebar dedicated to the note-taking feature.
*   **Working Area (Right):** The primary content area that uses a tab-based system to display different views.

### 2. To-do List Module
The to-do list has been implemented as an advanced, Notion-style **Kanban Board**.
*   **View:** Opens in a dedicated "To-do List" tab.
*   **Columns:** Three status columns: "Belum dimulai" (Upcoming), "Sedang berlangsung" (In Progress), and "Selesai" (Done).
*   **Cards:** Each to-do item is a card that can be dragged and dropped between columns.
*   **In-Card Editing:**
    *   The **title and a short description** can be edited directly on the card via a *double-click*.
    *   **Priority** can be changed by clicking the priority badge, which cycles through "Low", "Medium", and "High".
    *   **Deadline** can be set by clicking the absolute date display on the card's footer, which opens a native date-time picker.
*   **Note Integration:** Each to-do card has an associated long-form note page, accessible via a "File" icon, which opens in a slide-in modal window.

### 3. Note-Taking Module
This provides a simple, flat-list system for general notes.
*   **Sidebar Integration:**
    *   A "Catatan Baru" (New Note) button in the sidebar creates a new note.
    *   A list of all notes is displayed in the sidebar. Each note item shows a "Delete" button on hover.
*   **Tab-Based Editing:**
    *   Clicking a note from the sidebar opens it in a **new tab** in the working area.
    *   The note's title can be edited from the large title input at the top of the view.
    *   The note's content is edited using a rich Markdown editor.

### 4. Rich Text Editor (Tiptap)
A shared `MarkdownEditor` component is used for both to-do notes and the main note-taking feature.
*   **Technology:** Built on the **Tiptap** framework.
*   **Toolbar:** Features a formatting toolbar with icon-based buttons for Bold, Italic, Strikethrough, Headings, Code Blocks, and Blockquotes.
*   **Placeholder:** Displays "Ketikan catatan disini..." when the content is empty.
*   **Styling:** Fully integrated with the application's dark/light mode theme.
