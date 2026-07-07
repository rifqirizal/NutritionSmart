# PRD Profile Management

## Objective
Mengelola data kesehatan pengguna (fisik dan tujuan kebugaran), yang akan digunakan sebagai dasar kalkulasi *Total Daily Energy Expenditure* (TDEE) dan target nutrisi harian di seluruh aplikasi.

## Features
- **Data Fisik:** Input Usia, Gender, Berat Badan Saat Ini, Tinggi Badan.
- **Target & Goal:** Input Berat Badan Target dan Goal utama (Maintain, Lose Weight, Gain Weight).
- **Activity Level:** Menentukan pengali aktivitas (Sedentary, Active, dll) untuk rumus TDEE.
- **Auto-calculation:** Aplikasi otomatis menghitung target kalori harian (TDEE) secara mandiri.

## Acceptance Criteria
- [x] Validasi input berfungsi (usia, berat, tinggi tidak boleh negatif atau kosong).
- [x] Data profil tersimpan di database dan terhubung ke `user_id`.
- [x] Dashboard dan fitur Scan AI menggunakan data profil ini untuk memberikan saran yang relevan (misal: rekomendasi kalori/protein).
- [x] Pengguna diarahkan ke halaman profil saat mencoba mengakses fitur utama jika profil belum lengkap.