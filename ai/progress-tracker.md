# Project Progress Tracker

Dokumen ini berfungsi untuk melacak progress (status pengerjaan) dari fitur-fitur dan perbaikan yang ada di aplikasi **Smart Nutrition Tracker**. Setiap AI session harus membaca file ini untuk memahami context sampai mana proyek berjalan, dan **wajib** meng-update file ini setiap selesai mengerjakan suatu fitur atau perbaikan.

## MVP Scope Progress

- [ ] **Authentication**
  - [ ] Register
  - [ ] Login
  - [ ] Logout
- [ ] **Profile Setup & Management**
  - [ ] Create Profile (Birth Date, Gender, Height, Weight, Goal)
  - [ ] Update Profile
  - [ ] Update Target/Goal
- [ ] **Food Scan & Nutrition Analysis**
  - [ ] Upload Image (Mobile Camera / Desktop Upload)
  - [ ] Integrasi AI Vision (Google Gemini)
  - [ ] Extract & Save Nutrition Info (Calories, Protein, Carbs, Fat)
  - [ ] Save to Database
- [ ] **Dashboard**
  - [ ] Daily Summary Calculation
  - [ ] Real-time Progress Widget
  - [ ] Target Progress Display
- [ ] **Reporting**
  - [ ] Weekly/Dynamic Report (7, 14, 30 days)
  - [ ] Monthly Report

## Recent Updates / Changelog

*Tuliskan setiap update di bawah ini dengan format:*
* `[Tanggal] - [Nama Modul] - Deskripsi perubahan/fitur. - (Branch: \`nama-branch\`, Commit Msg: \`pesan commit\`)`

* **2026-07-07** - **Initialization** - Membuat progress tracker file. - (Branch: `master`, Commit Msg: `feat: implement authentication middleware to protect routes and manage session redirection`)
* **2026-07-07** - **Food Scan** - Memperbaiki bug ukuran payload pada versi mobile dan menambahkan fitur pemilih suara TTS lokal. - (Branch: `master`, Commit Msg: `fix: implement food scanning page with image compression and TTS support`)
* **2026-07-07** - **Food Scan** - Mengganti fitur TTS voice menjadi fitur *Translate* rekomendasi AI ke berbagai bahasa (Inggris, Jepang, Korea) menggunakan Gemini. - (Branch: `master`, Commit Msg: `feat: replace TTS with AI translation feature for food scan advice`)
* **2026-07-07** - **Dashboard** - Menambahkan tampilan tanggal pada daftar Recent Meals agar pengguna tidak bingung melihat waktu makan dari hari sebelumnya. - (Branch: `master`, Commit Msg: `fix: add date format to recent meals list in dashboard`)
* **2026-07-07** - **Food Scan** - Fix bug Vercel Production EROFS (Read-only file system) dengan menyimpan gambar terkompresi langsung sebagai Base64 string ke database, menghindari penulisan ke sistem lokal. - (Branch: `master`, Commit Msg: `fix: resolve vercel EROFS error by saving image as base64 string`)
* **2026-07-07** - **Dashboard** - Fix bug dashboard kosong (Error 500) di *production* akibat pengecekan `existsSync` pada Base64 string yang memicu `ENAMETOOLONG`. Pengecekan file lokal dihapus sepenuhnya karena tidak relevan di lingkungan *serverless*. - (Branch: `master`, Commit Msg: `fix: remove local file existence check in dashboard API`)
* **2026-07-07** - **Dashboard** - Fix bug ringkasan harian (kalori/protein) kosong di production akibat perbedaan zona waktu antara Vercel (UTC) dan lokal (UTC+7). Menyeragamkan kalkulasi *midnight* ke zona waktu Jakarta (UTC+7) di seluruh API. - (Branch: `master`, Commit Msg: `fix: resolve timezone drift between vercel and local causing empty daily summary`)
