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

* **2026-07-07** - **Dashboard** - Fix bug dashboard kosong (Error 500) di *production* akibat pengecekan `existsSync` pada Base64 string yang memicu `ENAMETOOLONG`. Pengecekan file lokal dihapus sepenuhnya karena tidak relevan di lingkungan *serverless*. - (Branch: `master`, Commit Msg: `fix: remove local file existence check in dashboard API`)
* **2026-07-07** - **Dashboard** - Fix bug ringkasan harian (kalori/protein) kosong di production akibat perbedaan zona waktu antara Vercel (UTC) dan lokal (UTC+7). Menyeragamkan kalkulasi *midnight* ke zona waktu Jakarta (UTC+7) di seluruh API. - (Branch: `master`, Commit Msg: `fix: resolve timezone drift between vercel and local causing empty daily summary`)
* **2026-07-08** - **Translate API** - Fix bug Error 500 pada fitur terjemahan AI dengan menyesuaikan format payload SDK `@google/genai` terbaru (`contents` array structure). - (Branch: `master`, Commit Msg: `fix: update gemini payload format in translate API`)
* **2026-07-08** - **Dashboard** - Fix bug tombol "View all report" tidak muncul di *Recent Meals* dengan meningkatkan batas *fetch* API dari 5 menjadi 6 agar logika validasi berjalan benar. - (Branch: `master`, Commit Msg: `fix: increase recent meals query limit to show view all button`)
* **2026-07-08** - **Food Scan** - Memperbaiki isu data Dashboard yang lambat ter-update setelah melakukan *scan* baru. Menambahkan `queryClient.invalidateQueries(['dashboardData'])` agar cache *React Query* langsung di-*refresh* setelah *scan* berhasil. - (Branch: `master`, Commit Msg: `fix: invalidate dashboard cache on successful scan`)
