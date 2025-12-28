# Demo Highlights: Personal Workspace

Gunakan dokumen ini sebagai panduan cepat saat presentasi atau sesi Q&A besok.

## 1. Filosofi Utama (The "Why")
*   **Minimalisme Radikal:** Menghilangkan hambatan antara pikiran dan tulisan. Tidak ada fitur yang tidak perlu (*bloatware*).
*   **Privacy First (Local-First):** Data 100% milik pengguna. Tidak ada server, tidak ada login, tidak ada pelacakan. Semua tersimpan di browser via IndexedDB.

## 2. Kekuatan Teknis (The "How")
*   **Stack:** React 19 + Vite 7 (Terbaru & Tercepat).
*   **Styling:** Tailwind CSS 4 dengan sistem *Zinc* palette untuk kenyamanan mata.
*   **Database:** **IndexedDB** (NoSQL di browser). Kelebihannya dibanding LocalStorage: kapasitas lebih besar (bisa GB) dan asinkron (tidak bikin web macet).
*   **Editor:** **Tiptap** (Blok-based editor). Mendukung Markdown secara native.
*   **Interaktivitas:** Drag & Drop Kanban yang mulus menggunakan `@hello-pangea/dnd`.

## 3. Fitur Unggulan (The "Wow" Factor)
*   **UI Adaptive & Responsive:**
    *   Desktop: Layout workspace profesional.
    *   iPad/Tablet: Sidebar melayang (*overlay*) dan Kanban otomatis jadi satu kolom agar tidak sesak.
    *   Mobile: Kompak, tab kecil, dan navigasi status tugas menggunakan *tab switcher*.
*   **Smart Deadline:** Badge tanggal yang pintar. Jika hari-H, akan menampilkan sisa jam (`5j lagi`) bukan cuma tanggal mati.
*   **Input Stabil:** Pemisahan input Tanggal dan Waktu untuk menjamin kompatibilitas di semua merk HP/browser.
*   **Organisasi Catatan:** Mendukung sistem **Folder** dan **#Tags** untuk pengelompokan yang fleksibel.

## 4. Simulasi Q&A (Pertanyaan Jebakan)
*   **T: "Kenapa gak pake database online kayak Firebase/Supabase?"**
    *   **J:** "Tujuan utama aplikasi ini adalah privasi dan akses offline instan. Dengan IndexedDB, user punya kendali penuh atas datanya tanpa perlu khawatir soal koneksi internet atau kebocoran data di server pihak ketiga."
*   **T: "Gimana kalau user hapus cache browser? Datanya hilang?"**
    *   **J:** "IndexedDB lebih persisten dibanding cache biasa, tapi ya, jika user melakukan 'Clear All Data', data akan terhapus. Solusi kedepannya adalah fitur Export/Import data yang sedang dalam rencana pengembangan."
*   **T: "Kenapa fitur Drag & Drop dimatikan di mobile?"**
    *   **J:** "Ini adalah keputusan UX. Di layar kecil, gestur drag sering bentrok dengan gestur scroll. Kami memprioritaskan kenyamanan membaca, namun tetap memberikan kemampuan pindah status lewat modal detail."
