# PRD Food Scan

## Objective
Mengidentifikasi makanan dari foto yang diunggah pengguna, menghitung estimasi nutrisinya menggunakan AI, dan menampilkannya dengan saran kesehatan multi-bahasa.

## Features
- **Image Upload:** Mendukung kamera ponsel dan unggah file dari galeri.
- **Client-Side Compression:** Gambar dikompres secara lokal menggunakan HTML Canvas ke format WebP (<50KB) sebelum dikirim ke server.
- **AI Vision Analysis:** Menggunakan Gemini 2.5 Flash untuk mengenali makanan dan menghasilkan metrik nutrisi (Kalori, Protein, Karbohidrat, Lemak, Confidence Score).
- **AI Recommendation:** Memberikan saran konsumsi yang disesuaikan dengan *Goal* pribadi pengguna.
- **Multi-language Translation:** Saran AI dapat diterjemahkan secara dinamis ke ID dan EN.
- **Base64 Storage:** Gambar disimpan secara permanen di database PostgreSQL sebagai string Base64 (mengatasi batasan Vercel EROFS).

## Acceptance Criteria
- [x] Pengguna bisa mengambil foto atau memilih dari galeri.
- [x] Ukuran payload di bawah batas Vercel (4.5MB) berkat kompresi *client-side*.
- [x] AI mengembalikan JSON terstruktur dengan metrik nutrisi akurat.
- [x] Error 429 (Rate Limit Gemini) ditangani dengan pesan ramah.
- [x] Hasil analisa dan gambar tersimpan sempurna di database.
- [x] Fitur terjemahan saran AI berfungsi dengan baik.
