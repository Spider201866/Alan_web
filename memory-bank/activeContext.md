<!-- Alan UI - activeContext.md | 22nd June 2025, WJW -->

# Active Context

## Current Work Focus
All code health, performance, and documentation tasks are complete. The project is stable and ready for the next phase of development.

## Recent Changes
- **Jest Deprecation Warnings Fixed (June 22, 2025):** Refactored `tests/ui.test.js` to correctly manage the JSDOM lifecycle, resolving the `_document` property access warnings.
- **Deprecated Dependencies Investigated (June 22, 2025):** Confirmed that remaining deprecation warnings stem from sub-dependencies of already-updated packages (`jest`, `css-minify`) and are not actionable at this level.
- **Documentation Refactor (June 22, 2025):** Pruned and refactored all documentation for clarity and conciseness, including the creation of `.clinerules/reminders.md`.

<details>
<summary>Archived Changes (pre-refactor)</summary>

- **Code Health and Stability (June 22, 2025):**
    - Aligned Node.js versions, updated all dependencies, and fixed the test suite.
- **Performance Optimization (June 22, 2025):**
    - Implemented a full build and optimization pipeline.

</details>

## Next Steps
1.  **Implement PWA Service Worker for Install Prompt.**
2.  **Address `EBUSY` error in test cleanup.** (Lower priority)

## Active Decisions and Considerations
- The project is stable. The remaining `EBUSY` error and sub-dependency deprecation warnings are accepted, known issues that do not block development.

## Important Patterns and Preferences
- **JSDOM Test Cleanup**: UI tests must properly tear down the JSDOM environment (e.g., `window.close()`) in an `afterEach` block to prevent memory leaks and deprecation warnings.
- **Sub-dependency Investigation**: When deprecation warnings persist after updating top-level packages, use `npm ls <package-name>` to trace the dependency chain and confirm the source.

## Learnings and Project Insights
- **Test Environment Management**: Seemingly minor issues in test setup (like not closing a JSDOM window) can lead to deprecation warnings that signal future breaking changes. Proper setup and teardown are critical for long-term test suite stability.
