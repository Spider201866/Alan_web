<!-- Alan UI - activeContext.md | 22nd June 2025, WJW -->

# Active Context

## Current Work Focus
The build failure on Railway has been resolved by removing the `critical` CSS package. All documentation has been updated to reflect this change. The project is now stable and deployable.

## Recent Changes
- **Build Fix (June 22, 2025):**
    - Removed the `critical` package and its associated logic from the build script to resolve persistent build failures in the Railway deployment environment.
    - Removed the `nixpacks.toml` configuration file as it was no longer needed.
    - Updated all documentation to reflect the removal of the critical CSS optimization.
- **Jest Deprecation Warnings Fixed (June 22, 2025):** Refactored UI tests to correctly manage the JSDOM lifecycle.
- **Deprecated Dependencies Investigated (June 22, 2025):** Confirmed that remaining deprecation warnings stem from sub-dependencies.
- **Documentation Refactor (June 22, 2025):** Pruned and refactored all documentation for clarity.

## Next Steps
1.  **Implement PWA Service Worker for Install Prompt.**
2.  **Address `EBUSY` error in test cleanup.** (Lower priority)
3.  **Re-evaluate Critical CSS implementation.** (Future task)

## Active Decisions and Considerations
- The decision to remove the `critical` CSS optimization was a pragmatic choice to ensure the application is deployable. The benefits of the other optimizations (image processing, minification, Gzip) are still in place.

## Learnings and Project Insights
- **Deployment Environment Parity**: A build process that works locally may fail in a CI/CD environment if the underlying system dependencies are not identical. Debugging these issues can be complex.
- **Pragmatic Retreat**: When a specific optimization causes significant deployment issues, it's sometimes better to remove it and ensure the application is stable, rather than continuing to debug a complex environmental issue.
