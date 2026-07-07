# Custom Agent Rules for Smart Nutrition Tracker

## Rule 1: Always Keep PRD and Tests Updated
Whenever you (the AI agent) are tasked with creating a new MVP feature, modifying an existing feature, or applying bug fixes, you **MUST** always do the following BEFORE finishing your task:
1. **Update Context & PRD**: 
   - Check, update, or **CREATE** the specific PRD file located inside the respective module's folder (e.g., `src/app/dashboard/dashboard-prd.md`, `src/app/new-page/new-page-prd.md`) if a new page/module is built.
   - Jika ada update, perbaikan, atau penambahan fitur yang berdampak secara arsitektural/global, **WAJIB** mengecek dan memperbarui dokumentasi di folder `ai/context/` (`architecture.md`, `coding-standards.md`, `database-schema.md`, `security-rules.md`, `instruction.md`).
2. **Update Tests**: Write or update unit tests (using Vitest in the `__tests__` directory) to cover the new functionality or modified logic.

Do NOT skip this rule. The user expects automated tests to always cover the PRD cases.

## Rule 2: Update Progress Tracker
Catat pembaruan di `ai/progress-tracker.md` sebagai bagian dari pekerjaanmu **sebelum** user melakukan commit. Dengan begitu, perubahan fitur dan update tracker bisa di-commit bersamaan (cukup 1 kali commit).
Dalam setiap log pembaruan di changelog, **WAJIB** menyertakan nama branch yang sedang aktif dan Rencana Pesan Commit (Commit Message). Tidak perlu menyertakan hash commit untuk menghindari *double commit*.
Contoh format changelog:
`* **[Tanggal]** - **[Nama Modul]** - [Deskripsi] - (Branch: \`main\`, Commit Msg: \`feat: add food scan\`)`
