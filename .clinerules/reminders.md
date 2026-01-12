# Cline's Reminders & Rules

This file contains a checklist of important rules and common pitfalls to avoid during development on this project. I MUST read this before starting any task.

---

## 1. Command-Line Interface (CLI)

-   **PowerShell is the Target Shell**: The user is on Windows PowerShell.
-   **No `&&` for Chaining**: Do not use `&&` to chain commands. It will fail. Execute commands separately.
-   **Use PowerShell-Compatible Commands**:
    -   For recursive file listing, do not use `dir /s /b`. Use `Get-ChildItem -Recurse -File` instead.

-   **Ban CMD-style syntax in this repo** (it produces confusing failures in PowerShell and in Cline terminal capture):
    - ❌ `cmd /c ...`
    - ❌ `dir /a ...` (use `Get-ChildItem -Force`)
    - ❌ `%CD%`, `%PATH%` etc (use `$PWD.Path` / `$env:PATH`)
    - ❌ `set VAR=value` (use `$env:VAR='value'` or `cross-env` in npm scripts)

-   **PowerShell scriptblock gotcha**:
    - In `Where-Object`, always reference the pipeline item: `Where-Object { $_ -like '.git*' }`.
      `Where-Object { -like '.git*' }` is invalid.

-   **PowerShell curl gotcha**:
    - In PowerShell, `curl` is an alias for `Invoke-WebRequest` and can prompt for missing params.
    - Prefer `curl.exe -I http://localhost:3000` or `Invoke-WebRequest -Method Head -Uri http://localhost:3000`.

---

## 2. File Editing

-   **`replace_in_file` is Fragile**: This tool requires the `SEARCH` block to be an *exact* match of the file content.
    -   After any successful file modification, the internal state of the file has changed. Any subsequent `replace_in_file` call in the same turn **must** be based on the new content, not the original.
    -   For large or complex changes, it is safer and more reliable to use `write_to_file` with the complete, final content of the file.
-   **Always Verify File Content**: Do not assume the content of a file. Use `read_file` before editing if you are unsure of its current state.

---

## 3. NPM & Node.js

-   **Use `cross-env` for Scripts**: When setting environment variables in `package.json` scripts (like `NODE_OPTIONS`), always prefix the command with `cross-env` to ensure it works on both Windows and Linux/macOS.
-   **Test After Dependency Updates**: After any `npm install` of a new version (especially a major version), immediately run the full test suite (`npm test`) to catch any breaking changes.

-   **Scripts must declare direct dependencies**:
    - If a file in `scripts/` imports a package (e.g. `axe-core`, `glob`), ensure it exists in `package.json` (devDependencies) and isn’t only present transitively.

---

## 4. General Workflow

-   **Read the Memory Bank**: Always start by reviewing the memory bank files to understand the current project state, architecture, and context.
-   **Update Documentation**: After completing any significant task, update all relevant documentation (`README.md`, `folderList.txt`, and the memory bank files) to reflect the changes.

-   **Cline terminal execution mode**:
    - If command output capture becomes flaky in the VS Code integrated terminal, prefer Cline **Terminal Execution Mode → Background Exec**.
    - This reduces interactive prompt issues (e.g. PowerShell `curl` alias asking for `Uri:`) and “output could not be captured” hiccups.

-   **CI/build hygiene**:
    - Build transforms should be **idempotent** (re-running build shouldn’t introduce path bugs like `//`).
    - Avoid excessive CI log noise; gate verbose build output behind an env flag (e.g. `BUILD_DEBUG=true`).

---

## 5. Skills (on-demand instruction sets)

-   **If a Skill exists for the task, use it**: Prefer the project Skills in `.clinerules/skills/` when troubleshooting recurring issues.
-   **Git on Windows sanity checks**: If Git reports `fatal: not a git repository`, follow the `windows-git-sanity` Skill at:
    -   `.clinerules/skills/windows-git-sanity/SKILL.md`
    -   Avoid CMD-only syntax (e.g. `cd /d`, `dir /a`) in PowerShell. Always re-check `Get-Location` and `Test-Path .git` before retrying.
