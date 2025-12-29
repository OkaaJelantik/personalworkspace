# tools apa saja yang digunakan dalam pengembangan?
-------------
Untuk pengembangan Personal Workspace ini, kami menggunakan tech stack modern yang berfokus pada performa dan privasi:

1. **React 19 & Vite 7**: Fondasi utama untuk membangun antarmuka komponen yang cepat dan proses build yang efisien.
2. **Tailwind CSS 4**: Framework CSS utility-first terbaru untuk desain yang presisi dan sangat responsif.
3. **IndexedDB**: Database NoSQL murni bawaan browser sebagai pusat penyimpanan data (Local-First), memungkinkan kapasitas penyimpanan besar secara offline tanpa server.
4. **Tiptap Editor**: Framework editor "headless" untuk membangun editor catatan berbasis blok yang mendukung format Markdown.
5. **@hello-pangea/dnd**: Library untuk interaktivitas drag-and-drop pada Kanban board.
6. **Vercel**: Platform untuk deployment demo aplikasi secara cepat dan otomatis.
7. **Gemini AI Agent**: Asisten cerdas untuk membantu percepatan coding, arsitektur, dan optimasi UI/UX.

# Bisa jelasin singkat apa itu React, Tailwind, Vite, dan Vercel?
-------------
1. **React**: Adalah sebuah library JavaScript yang digunakan untuk membangun antarmuka pengguna berbasis komponen, di mana konsepnya ibarat menyusun Lego dengan memecah tampilan website menjadi bagian-bagian kecil yang independen. Workflow-nya memungkinkan React untuk secara otomatis memperbarui tampilan secara efisien hanya pada bagian yang datanya berubah tanpa perlu memuat ulang (refresh) seluruh halaman, sehingga aplikasi terasa sangat cepat dan interaktif.

2. **Tailwind CSS**: Adalah sebuah framework CSS berbasis utility-first untuk mendesain tampilan web yang ibarat memiliki kumpulan stiker hiasan gaya siap pakai untuk ditempelkan pada elemen. Workflow-nya dilakukan dengan menerapkan class-class utilitas langsung pada kode aplikasi, sehingga proses styling menjadi sangat cepat dan dilakukan secara real-time tanpa perlu menulis file CSS manual yang panjang dan rumit secara terpisah.

3. **Vite**: Adalah sebuah build tool modern yang berfungsi untuk mengelola aset kodingan dan bertindak sebagai asisten super cepat yang menyiapkan kodingan menjadi website siap tampil dalam hitungan detik. Vite bertugas mempercepat proses pengembangan dengan fitur pembaruan instan setiap kali kode disimpan dan mengoptimalkan hasil akhir aplikasi agar sangat ringan saat diakses oleh pengguna.

4. **Vercel**: Adalah platform hosting otomatis yang digunakan untuk mempublikasikan aplikasi web ke internet yang bertindak sebagai lahan pameran digital tempat kita menaruh hasil karya. Vercel menangani seluruh infrastruktur penyajian website sehingga aplikasi kita bisa diakses secara global melalui sebuah link (URL) khusus dengan proses deployment yang sangat praktis tanpa perlu mengelola server fisik sendiri.

# Bagaimana aplikasi ini bisa sangat responsif di berbagai perangkat?
-------------
Aplikasi ini menggunakan pendekatan Adaptive Layout yang didukung oleh fitur breakpoint dari Tailwind CSS. Kami merancang UI agar tidak hanya sekadar "mengecil", tapi benar-benar berubah perilaku sesuai ruang yang tersedia:

1. **Sistem Breakpoint**: Kami memanfaatkan class-class responsif untuk menentukan kapan sebuah elemen harus berubah bentuk. Misalnya, sidebar yang tadinya bersifat permanen di desktop akan otomatis berubah menjadi overlay (melayang) dengan backdrop gelap saat dibuka di layar tablet atau HP.
2. **Transformasi Komponen**: Beberapa komponen inti memiliki logika cerdas untuk beradaptasi. Contohnya, papan Kanban Board yang memiliki 3 kolom di desktop akan secara otomatis berubah menjadi format satu kolom luas di HP/Tablet, lengkap dengan navigasi tombol (switcher) di atasnya untuk memudahkan pengguna berpindah status tugas tanpa harus scroll menyamping.
3. **Optimasi Tipografi & Jarak**: Ukuran font, padding, and lebar tab disesuaikan secara otomatis. Editor catatan akan menggunakan font yang lebih kompak di mobile agar area menulis tetap terasa luas meskipun di layar kecil.
4. **Deteksi Perangkat**: Kami juga menggunakan logika JavaScript untuk mendeteksi ukuran layar guna menonaktifkan fitur tertentu yang kurang ramah di layar sentuh, seperti fitur drag-and-drop di mobile, demi memberikan pengalaman navigasi yang lebih stabil bagi pengguna HP.

# Kenapa aplikasi ini menggunakan IndexedDB dan mengusung konsep Local-First?
-------------
Aplikasi ini dirancang dengan prinsip Local-First, yang berarti data pengguna adalah prioritas utama dan disimpan langsung di perangkat mereka sendiri. Kami memilih IndexedDB sebagai mesin penyimpanannya karena beberapa alasan strategis:

1. **Privasi & Keamanan Mutlak**: Data tidak pernah dikirim ke server pihak ketiga. Hal ini menghilangkan risiko kebocoran data di cloud dan memberikan ketenangan bagi pengguna bahwa catatan pribadi mereka 100% aman di kendali mereka sendiri (Zero-Login, Zero-Telemetry).
2. **Akses Offline Instan**: Karena data disimpan secara lokal, aplikasi dapat dibuka dan digunakan secara penuh kapan saja dan di mana saja, bahkan tanpa koneksi internet sekalipun. Tidak ada proses loading atau hambatan karena jaringan yang lambat.
3. **Kapasitas Besar & Asinkron**: Berbeda dengan LocalStorage yang kapasitasnya sangat terbatas (5MB) dan lambat, IndexedDB adalah database NoSQL murni di browser yang mampu menyimpan data hingga hitungan Gigabyte dan bekerja secara asinkron. Ini memastikan aplikasi tetap lancar meskipun menyimpan ribuan catatan.
4. **Performa Maksimal (Zero Latency)**: Semua interaksi terasa instan karena aplikasi tidak perlu menunggu respon dari server jauh. Proses baca dan tulis data terjadi langsung di memori browser pengguna.

# Bagaimana proses perancangan UI/UX aplikasi ini?
-------------
Proses perancangan dilakukan dengan pendekatan "Design System First":
1.  **Wireframing:** Menentukan struktur Three-Pane Layout untuk memastikan alur kerja yang logis.
2.  **Visual Design di Figma:** Membuat komponen atom (button, card, input) dan menentukan Design Tokens (warna Zinc dan tipografi Sans-Serif).
3.  **Prototyping:** Menguji alur perpindahan tab dan interaksi Kanban untuk memastikan tidak ada hambatan visual (Zero-Noise).
4.  **Reverse Engineering to Code:** Mengimplementasikan token desain tersebut secara presisi menggunakan utility classes di Tailwind CSS 4.

# Mengapa desainnya terlihat sangat mirip dengan aplikasi modern seperti Notion atau Obsidian?
-------------
Hal ini disengaja untuk menjaga **Affordance** (kemudahan penggunaan karena familiaritas). Dengan mengadopsi pola desain yang sudah dikenal pengguna (seperti sidebar di kiri dan tab di atas), aplikasi ini tidak memerlukan kurva pembelajaran yang tinggi. Pengguna bisa langsung produktif tanpa perlu mempelajari antarmuka baru yang asing.
