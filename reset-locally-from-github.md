<!-- Alan UI - reset-locally-from-github.md -->
# How to Reset Your Local Project to Match a GitHub Commit

This guide will help you completely reset your local project directory to match a specific commit from your GitHub repository (e.g., "dolphin2" on https://github.com/Spider201866/Alan_web). This is useful if you want to undo all local changes and ensure your files are identical to a known good state.

---

## Step-by-Step Instructions

**IMPORTANT:**  
DO NOT use `&&` to chain commands in PowerShell.  
Instead, run each command separately, one after the other.

---

### 1. Open a terminal in your project directory

Make sure you are in the root folder of your project (e.g., `C:\Users\YourName\Desktop\AlanUI`).

---

### 2. Fetch the latest changes from GitHub

```powershell
git fetch origin
```

---

### 3. Find the Latest Commit Name

**To see the 5 most recent commit names (for confidence):**

```powershell
git log --oneline -5 origin/main
```

This will output something like:

```
3606cbe dolphin9
a1b2c3d dolphin8
e4f5g6h dolphin7
...
```

**The name after the hash (e.g., `dolphin9`) is the commit name you can use.**

---

### 4. Reset your local files to the desired commit

Replace `dolphin9` with the commit name you want to reset to (as seen above).

```powershell
git reset --hard dolphin9
```

If you want to reset to the latest commit on the main branch:

```powershell
git reset --hard origin/main
```

---

### 5. Remove all untracked files and folders

This will delete any files or directories that are not tracked by git (including any extra files you created locally).

```powershell
git clean -fdx
```

---

### 6. Install dependencies (Node.js projects)

If your project uses Node.js (has a `package.json` file), you **must** reinstall dependencies after resetting.  
Otherwise, your server and scripts will not run.

```powershell
npm install
```

This will restore the `node_modules` folder and all required packages.

---

### 7. Verify

Your local files are now **identical** to the specified commit on GitHub, and all dependencies are installed.  
Open your project in VSCode and confirm everything looks as expected.

---

## Troubleshooting

- **If you see errors like `Cannot find module 'express'` or other missing packages, you forgot to run `npm install`.**
- If you see errors about the commit name, make sure you spelled it exactly as it appears on GitHub (case-sensitive).
- If you want to see all available commits, use:
  ```powershell
  git log --oneline --decorate --all
  ```
- If you want to see all remotes:
  ```powershell
  git remote -v
  ```

---

## Notes

- **Never use `&&` to chain commands in PowerShell.**  
  Run each command on its own line.
- This process will **delete all local changes and untracked files**. Make sure you have backed up anything important before running these commands.

---

## Example: Full Reset to the Most Recent Commit

1. See the latest commit name:
   ```powershell
   git log --oneline -1 origin/main
   ```
   (Suppose it shows `3606cbe dolphin9`)

2. Reset to that commit:
   ```powershell
   git reset --hard dolphin9
   git clean -fdx
   ```

---

**You can now be confident your local project matches GitHub exactly.**
