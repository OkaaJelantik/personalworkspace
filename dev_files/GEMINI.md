# Gemini Context: Personal Workspace

## 1. Identitas Proyek
*   **Nama:** Personal Workspace.
*   **Jenis:** Aplikasi Web Single-Page (SPA) Local-First.
*   **Filosofi Utama:**
    1.  **Minimalis & Kemudahan (Prioritas #1):** Fokus pada pengurangan distraksi dan penggunaan yang intuitif/langsung (*out-of-the-box*).
    2.  **Privasi & Local-First (Prioritas #2):** Kepemilikan data penuh oleh pengguna (IndexedDB), tanpa Login, tanpa Telemetry.

## 2. Stack Teknologi
*   **Core:** React 19 + Vite 7.
*   **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite`).
*   **Database:** **IndexedDB** murni (implementasi di `src/services/db.js`).
*   **Editor:** **Tiptap** (Headless WYSIWYG + Markdown).
*   **Interaktivitas:** `@hello-pangea/dnd` (Kanban Drag-and-Drop).
*   **Ikon:** `lucide-react`.

## 3. Arsitektur Sistem
*   **Entry Point:** `src/main.jsx` -> `src/App.jsx`.
*   **State Management:** Global state (`tabs`, `notes`) di `App.jsx`; Notifikasi via `ToastContext`.
*   **Layout:**
    *   **Toolbar (Kiri):** Navigasi global.
    *   **MainSidebar:** Manajemen daftar catatan.
    *   **WorkingArea:** Area konten berbasis Tab (Todo View / Note Editor).

## 4. Aturan Pengembangan (Rules)
*   **Styling:** Wajib menggunakan *utility classes* Tailwind CSS. Hindari CSS kustom kecuali terpaksa.
*   **Data:** Semua data persisten wajib masuk IndexedDB. Dilarang menambah dependensi ke layanan cloud/API eksternal.
*   **Eksekusi Perintah (Long-Running):**
    *   **Perintah:** `npm run dev`, `npx tailwindcss --watch`.
    *   **PENTING:** Perintah ini bersifat *blocking*. **JANGAN** jalankan di foreground karena akan mematikan sesi agent.
    *   **Tindakan:** Minta user menjalankannya di terminal terpisah, atau jalankan di background (menggunakan `&` atau `Start-Job`).

## 5. Referensi File
*   **Rencana Fitur:** `dev_files/DESIGN_PLAN.md`.
*   **Laporan Akademis:** `dev_files/LAPORAN_AKHIR.md`.
