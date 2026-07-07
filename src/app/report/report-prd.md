# PRD Reporting

## Objective
Menyediakan visualisasi data tren asupan nutrisi selama periode waktu tertentu serta merangkum riwayat makanan dan rekomendasi AI.

## Features
- **Timeframe Filter:** Pengguna dapat memilih rentang waktu laporan (7 Hari, 14 Hari, 30 Hari).
- **Nutrition Chart:** Grafik batang interaktif (Bar Chart menggunakan Recharts) untuk memvisualisasikan asupan kalori harian.
- **Summary Metrics:** Menampilkan total rata-rata/keseluruhan konsumsi dalam periode yang dipilih (Total Calories, Protein, Carbs, Fat).
- **Meal AI Recommendations List:** Menampilkan daftar lengkap makanan yang pernah di-scan beserta saran AI-nya.
- **Pagination:** Daftar makanan dibatasi maksimal 4 item per halaman dengan navigasi *Next/Back*.

## Acceptance Criteria
- [x] Data ditarik secara dinamis menggunakan React Query dengan auto-refetch.
- [x] Chart me-render dengan benar sesuai rentang waktu yang dipilih.
- [x] Pagination di *AI Recommendations* berjalan mulus tanpa reload halaman.
- [x] Nomor halaman otomatis kembali ke 1 jika pengguna mengganti filter waktu.
