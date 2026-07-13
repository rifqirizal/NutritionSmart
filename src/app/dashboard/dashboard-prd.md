# PRD Dashboard

## Objective
Menampilkan ringkasan nutrisi harian pengguna secara *real-time* dan memantau pencapaian target nutrisi harian berdasarkan profil pengguna.

## Features
- **Daily Summary:** Menampilkan total asupan Kalori, Protein, Karbohidrat, dan Lemak harian.
- **Progress Tracking:** Menampilkan persentase pencapaian target kalori harian.
- **Dynamic Target Calculation:** Target kalori otomatis disesuaikan dengan `goal` (Diet/Maintain/Bulking) dan selisih berat badan di Profile.
- **Smart Feedback:** Menampilkan peringatan warna dan teks (contoh: peringatan jika kalori melebihi batas, atau sukses jika tepat target).
- **Recent Meals:** Menampilkan maksimal 5 makanan terakhir yang di-scan pada hari tersebut, dilengkapi nama makanan, waktu, dan kalori.

## Acceptance Criteria
- [x] Data *real-time* tersinkronisasi (menggunakan React Query dengan `refetchInterval` 5 menit dan `staleTime: 0`).
- [x] Cache dashboard wajib di-invalidate (`queryClient.invalidateQueries`) setelah ada update profil atau penambahan makanan baru via *scan*.
- [x] Progress target tampil akurat dengan visual progress bar.
- [x] Menghindari bug *timezone drift* antara lokal dan server (perhitungan *midnight* dikunci ke UTC+7 Jakarta).
- [x] Tanggal dan jam tampil rapi di daftar *Recent Meals*.