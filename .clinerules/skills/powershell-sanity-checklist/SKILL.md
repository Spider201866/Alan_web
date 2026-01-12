---
name: powershell-sanity-checklist
description: Quick PowerShell-first sanity checklist for this repo. Use at the start of a session (or when commands behave oddly) to avoid CMD syntax, curl alias prompts, and Git false negatives.
---

# PowerShell Sanity Checklist (AlanUI repo)

## Purpose
This is a fast, copy/paste checklist to confirm:
- you’re in the expected directory
- you’re using PowerShell-native commands (not CMD)
- `curl` alias pitfalls won’t cause interactive prompts
- Git sees the repo (and `.git` hasn’t been renamed)

If anything fails, do **not** loop the same command. Switch to the relevant Skill (especially `windows-git-sanity`).

## One-shot checklist (copy/paste)

```powershell
Write-Host 'PWD:' (Get-Location)
Write-Host 'PSVersion:' $PSVersionTable.PSVersion

Write-Host '--- PowerShell-native listing (no CMD dir) ---'
Get-ChildItem -Force | Select-Object -First 10 -ExpandProperty Name

Write-Host '--- curl alias check (PowerShell) ---'
Get-Command curl | Format-List Name,CommandType,Source

Write-Host '--- curl.exe HEAD (should not prompt for Uri) ---'
try {
  curl.exe -I http://localhost:3000 2>$null | Select-Object -First 5
} catch {
  Write-Host $_.Exception.Message
}

Write-Host '--- Invoke-WebRequest HEAD (PowerShell native) ---'
try {
  (Invoke-WebRequest -Method Head -Uri http://localhost:3000).StatusCode
} catch {
  Write-Host $_.Exception.Message
}

Write-Host '--- Git metadata check (.git vs .git_disabled) ---'
Get-ChildItem -Force -Name | Where-Object { $_ -like '.git*' }
if ((Test-Path -LiteralPath .git_disabled) -and !(Test-Path -LiteralPath .git)) {
  Write-Host 'ERROR: .git is missing but .git_disabled exists. Rename it back or use windows-git-sanity.' -ForegroundColor Red
}

Write-Host '--- git status (prefer -sb) ---'
git status -sb
```

## If git fails
- Run: `.clinerules/skills/windows-git-sanity/SKILL.md`
- Common culprits:
  - `.git` renamed to `.git_disabled`
  - `GIT_DIR` / `GIT_WORK_TREE` overrides
  - running in the wrong folder

## If output capture is flaky
If using Cline and command outputs are inconsistent, consider enabling **Background Exec** mode in Cline Terminal Settings.

