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
* `[Tanggal] - [Nama Modul] - Deskripsi perubahan/fitur. - (Branch: \`nama-branch\`, Commit: \`hash - pesan commit\`)`

* **2026-07-07** - **Initialization** - Membuat progress tracker file. - (Branch: `master`, Commit: `31ce979 - feat: implement authentication middleware to protect routes and manage session redirection`)
