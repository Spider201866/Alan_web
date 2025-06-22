<!-- Alan UI - activeContext.md | 22nd June 2025, WJW -->

# Active Context

## Current Work Focus
The documentation has been refactored for clarity and conciseness. The project is now ready for the next phase of development.

## Recent Changes
- **Documentation Refactor (June 22, 2025):**
    - Pruned `README.md` to be a concise "Quick Start" guide.
    - Refactored `techContext.md` and `systemPatterns.md` to have clearer, more distinct purposes.
    - Created `.clinerules/reminders.md` to document common AI pitfalls and development rules.
    - Used `<details>` tags in `progress.md` and `activeContext.md` to archive older content while keeping it accessible.
- **Code Health and Stability (June 22, 2025):**
    - Aligned Node.js versions, updated all dependencies, and fixed the test suite.
- **Performance Optimization (June 22, 2025):**
    - Implemented a full build and optimization pipeline.

<details>
<summary>Archived Learnings & Decisions</summary>

### Active Decisions and Considerations (pre-refactor)
- The project is now on a much more stable footing with updated dependencies and a robust, cross-platform test suite.
- The `EBUSY` error in the test cleanup is a known, low-priority issue that does not affect the correctness of the tests.

### Important Patterns and Preferences (pre-refactor)
- **Test-After-Update**: After any dependency update, especially a major version change, the full test suite must be run to catch breaking changes immediately.
- **Cross-Platform Compatibility**: npm scripts that set environment variables must use `cross-env` to ensure they work on all developer machines.

### Learnings and Project Insights (pre-refactor)
- **Major Dependency Updates Have Risks**: Updating a major version of a core dependency like Express can introduce significant breaking changes that require careful debugging and code modification.
- **Cross-Platform Development is Key**: A script that works perfectly on a Linux-based CI server can easily fail on a Windows local machine if not written with cross-platform compatibility in mind. `cross-env` is an essential tool for this.
- **Tool Brittleness**: The `replace_in_file` tool can be brittle for large, complex changes in documentation files. When multiple attempts fail, falling back to `write_to_file` with the full, intended content is a more reliable strategy.
- **PowerShell vs. CMD**: CLI commands must be tailored to the user's shell. `dir` with CMD flags fails in PowerShell; `Get-ChildItem` is the appropriate equivalent.

</details>

## Next Steps
1.  **Implement PWA Service Worker for Install Prompt.**
2.  **Address `EBUSY` error in test cleanup.** (Lower priority)
