# Smart Nutrition Tracker

## Project Overview

Smart Nutrition Tracker adalah aplikasi berbasis web (PWA) yang membantu pengguna memonitor asupan nutrisi harian melalui analisis foto makanan menggunakan AI Vision.

Pengguna cukup mengambil foto makanan dan sistem akan:

* Mengidentifikasi makanan
* Mengestimasi kandungan nutrisi
* Menyimpan riwayat konsumsi
* Memberikan rekomendasi nutrisi
* Menampilkan laporan perkembangan nutrisi

---

## Product Vision

Menjadi personal nutrition assistant berbasis AI yang membantu pengguna memahami dan memperbaiki pola makan sehari-hari.

---

## Business Goals

* Membantu pengguna memahami konsumsi nutrisi.
* Meningkatkan kesadaran pola makan sehat.
* Memberikan rekomendasi berbasis AI.
* Menyediakan laporan perkembangan nutrisi.

---

## User Roles

### User

Dapat:

* Registrasi
* Login
* Mengelola profil
* Scan makanan
* Melihat dashboard
* Melihat laporan

---

## AI Development Workflow

1. Create Instruction
2. Create Database Schema
3. Create PRD Per Module
4. Create API Contract
5. Create UI Specification
6. Create Task Breakdown
7. Generate Implementation
8. Generate Testing Scenario

---

## Core Modules

1. Authentication
2. Profile Management
3. Food Scan
4. AI Recommendation
5. Dashboard
6. Reporting

---

## MVP Scope

Included:

* Authentication
* Profile Setup
* Food Scan (Responsive UI: Mobile Camera, Desktop File Upload, Client-side Image Compression)
* Nutrition Analysis (Gemini 2.5 Flash)
* AI Advice Translation (Multi-language Support)
* Dashboard (Real-time update via React Query)
* Weekly/Dynamic Report (Filter by 7, 14, 30 days) with AI Recommendations Pagination (max 4 per page)
* Monthly Report

Excluded:

* Chatbot
* Barcode Scanner
* Smartwatch Integration
* Social Features
* Meal Planning

---

## Success Metrics

* User berhasil melakukan scan makanan
* Nutrisi tersimpan ke database
* Dashboard berjalan normal
* Laporan mingguan dan bulanan tersedia
* AI menghasilkan rekomendasi nutrisi

---

## Data Retention & Storage Policy

Untuk menjaga efisiensi pengembangan (fase MVP) dan mengatasi limitasi *Read-Only File System* (EROFS) pada *serverless* Vercel:
* **Gambar (Images):** File foto makanan yang diunggah akan dikompresi di sisi klien (*client-side compression*) menggunakan `canvas` ke format `webp` hingga berukuran sangat kecil (< 50KB).
* **Penyimpanan:** Gambar yang sudah dikompresi akan dikonversi menjadi *Base64 string* dan langsung disimpan ke dalam kolom `image_url` berjenis `TEXT` di *Database* (PostgreSQL). Tidak menggunakan penyimpanan file lokal (`public/upload`) maupun *Cloud Storage* eksternal.
* **Cron Cleanup:** Tidak diperlukan Cron Job lagi karena gambar tidak berbentuk file fisik yang membebani folder server. 
* **Reporting Module:** Modul Laporan (Weekly/Monthly Report) **TIDAK** memuat ulang atau merender gambar (*images*) untuk menghemat *bandwidth* dan mempercepat *rendering*. Laporan sepenuhnya berbasis data analitik teks/angka.

---

## UI Design Guidelines

* **Theme Color:** *Emerald Green* (`#10b981`) digunakan sebagai warna utama (*primary color*) untuk melambangkan nutrisi dan kesehatan.
* **Aesthetics:** Mengadopsi standar modern *Dribbble* (sudut membulat `rounded-3xl`, *glassmorphism*, bayangan/shadow halus).
<!-- * **Dark Mode:** Didukung secara penuh melalui `next-themes` (menggunakan *tailwind dark variant*). -->
* **Animations:** Animasi *micro-interactions* (seperti efek masuk, geser, *hover*) ditangani oleh `framer-motion`.

---

## Technical Performance & Best Practices

* **State Management:** Menggunakan `React Query` untuk *data fetching* yang tersentralisasi dengan fitur *real-time auto-refetching* (misal setiap 5 menit) pada Dashboard, Report, dan Profile.
* **Hooks Optimization:** Wajib menerapkan `useMemo` untuk perhitungan turunan yang kompleks dan `useCallback` untuk *handler function* guna mencegah re-render yang tidak perlu.
* **Camera Access:** Pengelolaan izin kamera dipisahkan menggunakan *custom hook* `useCameraPermission` di direktori utils/hooks untuk memastikan *best practice* pengambilan hak akses perangkat secara eksplisit sebelum komponen *Video/Camera* dimuat.
