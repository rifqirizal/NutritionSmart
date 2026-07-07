# API Contract

Dokumen ini berisi spesifikasi *request* dan *response* untuk API yang digunakan dalam aplikasi NutriSmart, terutama yang berinteraksi dengan AI.

## 1. Scan Makanan (`POST /api/scan`)

Endpoint ini digunakan untuk menganalisis gambar makanan menggunakan AI (Google Gemini) dan mengembalikan informasi nilai gizi serta saran yang dipersonalisasi sesuai dengan *goal* (tujuan) pengguna.

**Request Payload:**
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `image` (File): Gambar makanan yang akan di-*scan* (wajib).

**Response Sukses (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-meal-id",
    "user_id": "uuid-user-id",
    "image_url": "/uploads/filename.jpg",
    "meal_name": "Nasi Goreng Spesial",
    "created_at": "2024-07-06T14:20:00.000Z",
    "advice": "Saran dari AI berdasarkan goal user, contoh: 'Nasi goreng ini cukup tinggi lemak dan karbohidrat. Karena goal kamu adalah menurunkan berat badan, pastikan untuk mengontrol porsi makan siangmu!'",
    "meal_nutrition": {
      "id": "uuid-nutrition-id",
      "meal_id": "uuid-meal-id",
      "calories": 450,
      "protein": 15,
      "carbs": 60,
      "fat": 18,
      "confidence_score": 0.92
    }
  }
}
```

**Response Gagal - Limit Tercapai (429 Too Many Requests):**
```json
{
  "success": false,
  "message": "The AI system is currently busy or has reached its limit. Please wait about 15 minutes and try again."
}
```

**Response Gagal - Unauthorized (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

**Response Gagal - Bad Request (400 Bad Request):**
```json
{
  "success": false,
  "message": "No image uploaded"
}
```

> **Catatan:** Jika ada perubahan pada struktur respons AI di `route.ts`, pastikan untuk memperbarui kontrak ini agar *frontend* dan *backend* tetap selaras.
