# Design Specification (Figma Reference)

Dokumen ini berisi spesifikasi teknis desain yang digunakan dalam pembuatan *Personal Workspace*. Gunakan data ini untuk menyelaraskan file Figma dengan kode implementasi.

## 1. Design Tokens

### Colors (Zinc Palette)
| Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Surface/Main** | `#FFFFFF` | Background Utama (Light) |
| **Surface/Dark** | `#18181B` | Background Utama (Dark) |
| **Border/Subtle** | `#E4E4E7` | Garis pemisah, Border Card |
| **Text/Primary** | `#18181B` | Judul, Teks Utama |
| **Text/Secondary**| `#71717A` | Teks keterangan, Sidebar item |

### Accent Colors (Subtle/Pastel)
| Category | Text Hex | Background Hex |
| :--- | :--- | :--- |
| **Sky** | `#0EA5E9` | `#F0F9FF` |
| **Emerald** | `#10B981` | `#ECFDF5` |
| **Rose** | `#F43F5E` | `#FFF1F2` |
| **Amber** | `#D97706` | `#FFFBEB` |

## 2. Typography
*   **Font Family:** Inter / Geist Sans (Fallback: System Sans-Serif).
*   **Scale:**
    *   `Display`: 24px / Bold (Judul Catatan).
    *   `Body`: 16px / Regular (Konten Catatan).
    *   `Small`: 14px / Medium (Sidebar, Tabs).
    *   `Tiny`: 12px / Semibold (Badges, Deadlines).

## 3. Component Architecture
Komponen utama dirancang dengan prinsip atomik:
1.  **Atom:** Icons (Lucide), Badges, Input fields.
2.  **Molecules:** Kanban Card, Sidebar Item, Tab.
3.  **Organisms:** Main Sidebar, Working Area (Editor/Kanban).
4.  **Templates:** Three-Pane Dashboard Layout.

## 4. Reverse Engineering Instruction (How to recreate in Figma)
1.  Jalankan aplikasi secara lokal (`npm run dev`).
2.  Gunakan plugin **"html.to.design"** di Figma.
3.  Impor URL `localhost:5173`.
4.  Terapkan Auto Layout pada layer yang diimpor untuk standarisasi jarak (Spacing: 4, 8, 12, 16px).
