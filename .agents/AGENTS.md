# Custom Agent Rules for Smart Nutrition Tracker

## Rule 1: Always Keep PRD and Tests Updated
Whenever you (the AI agent) are tasked with creating a new MVP feature or modifying an existing feature, you **MUST** always do the following BEFORE finishing your task:
1. **Update PRD**: Check and update the `ai/context/instruction.md` (or relevant PRD files) to reflect the new feature requirements or changes.
2. **Update Tests**: Write or update unit tests (using Vitest in the `__tests__` directory) to cover the new functionality or modified logic.

Do NOT skip this rule. The user expects automated tests to always cover the PRD cases.

## Rule 2: Update Progress Tracker
Catat pembaruan di `ai/progress-tracker.md` **HANYA** untuk perubahan yang sudah berhasil di-*commit* ke Git. JANGAN menambahkan log untuk iterasi *prompt* atau kode yang belum di-*commit*. Ketika sebuah fitur atau perbaikan sudah selesai dan di-*commit*, tambahkan SATU baris ringkasan ke dalam *changelog*.
Dalam setiap log pembaruan di changelog, **WAJIB** menyertakan nama branch yang sedang aktif dan pesan commit / hash terakhir.
Contoh format changelog:
`* **[Tanggal]** - **[Nama Modul]** - [Deskripsi] - (Branch: \`main\`, Commit: \`abc1234 - pesan commit di sini\`)`
