# Custom Agent Rules for Smart Nutrition Tracker

## Rule 1: Always Keep PRD and Tests Updated
Whenever you (the AI agent) are tasked with creating a new MVP feature or modifying an existing feature, you **MUST** always do the following BEFORE finishing your task:
1. **Update PRD**: Check and update the `ai/context/instruction.md` (or relevant PRD files) to reflect the new feature requirements or changes.
2. **Update Tests**: Write or update unit tests (using Vitest in the `__tests__` directory) to cover the new functionality or modified logic.

Do NOT skip this rule. The user expects automated tests to always cover the PRD cases.

## Rule 2: Update Progress Tracker
Catat pembaruan di `ai/progress-tracker.md` sebagai bagian dari pekerjaanmu **sebelum** user melakukan commit. Dengan begitu, perubahan fitur dan update tracker bisa di-commit bersamaan (cukup 1 kali commit).
Dalam setiap log pembaruan di changelog, **WAJIB** menyertakan nama branch yang sedang aktif dan Rencana Pesan Commit (Commit Message). Tidak perlu menyertakan hash commit untuk menghindari *double commit*.
Contoh format changelog:
`* **[Tanggal]** - **[Nama Modul]** - [Deskripsi] - (Branch: \`main\`, Commit Msg: \`feat: add food scan\`)`
