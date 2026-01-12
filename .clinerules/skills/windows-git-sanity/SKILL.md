---
name: windows-git-sanity
description: Diagnose and prevent false "fatal: not a git repository" errors on Windows PowerShell. Use when git status/add/commit/push fail unexpectedly, when .git appears missing, or when commands were mixed between PowerShell and CMD.
---

# Windows Git Sanity (PowerShell)

## Purpose
Prevent and quickly diagnose the common Windows issue where Git claims:

> fatal: not a git repository (or any of the parent directories): .git

This is often caused by:
- Running CMD-style commands in PowerShell (e.g. `cd /d`)
- Running commands from an unexpected working directory
- `GIT_DIR` / `GIT_WORK_TREE` environment variables overriding Git
- Path wrapping/copy-paste issues that make valid paths look invalid

## Non-negotiable rules
1) **PowerShell is the target shell.** Do not use CMD-only syntax.
   - ❌ Bad: `cd /d C:\path`
   - ✅ Good: `Set-Location -LiteralPath 'C:\path'`

2) **Always print working directory first** before diagnosing Git.
   - `Get-Location`

3) **No-loop policy:** If a git command fails, do not repeat it. Change hypothesis and run a different check.

## One-shot diagnostic (copy/paste)
Run this exactly once from the project root:

```powershell
Write-Host 'PWD:' (Get-Location)
Write-Host 'GIT_DIR:' $env:GIT_DIR
Write-Host 'GIT_WORK_TREE:' $env:GIT_WORK_TREE

Write-Host 'Has .git:' (Test-Path -LiteralPath .git)
if (Test-Path -LiteralPath .git) {
  Write-Host '--- .git HEAD ---'
  Get-Content -LiteralPath .git\HEAD
}

Write-Host '--- git rev-parse ---'
git rev-parse --show-toplevel
```

### Interpret results
- If `Has .git: False` → you are not in the repo root, or you are in a copied folder without git metadata.
- If `Has .git: True` and `rev-parse` works → repo is fine; earlier errors were due to shell/working-directory confusion.
- If `.git` exists but `rev-parse` fails → check for overrides.

## Fix: Clear overriding env vars
If `GIT_DIR` or `GIT_WORK_TREE` are set:

```powershell
Remove-Item Env:GIT_DIR -ErrorAction SilentlyContinue
Remove-Item Env:GIT_WORK_TREE -ErrorAction SilentlyContinue
```

Then run:

```powershell
git rev-parse --show-toplevel
```

## Safe fallback: Force git working directory
If your terminal is in a strange state, force the working directory:

```powershell
git -C (Get-Location).Path status
```

## Known gotcha: line wrapping in logs
If paths appear with broken lines (e.g. `Alan\nUI`), re-run the command with explicit quotes and `-LiteralPath`.

