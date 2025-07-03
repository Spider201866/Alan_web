<!-- Alan UI - systemPatterns.md | 22nd June 2025, WJW -->

# System Architecture & Patterns

This document outlines the high-level architecture and key design patterns used in the project.

---

## High-Level Architecture

The application is a traditional Node.js/Express server that serves a static frontend. For production, a build step is introduced to optimize assets.

```mermaid
graph TD
    subgraph "Development (Local)"
        A[Developer] -- Works on --> B(public/);
        B -- Served by --> C{Dev Server (npm run dev)};
    end

    subgraph "CI/CD Pipeline (GitHub Actions)"
        D[Push to main] --> E{npm test};
        E -- On success --> F{npm run build};
        F -- Creates --> G[dist/];
    end

    subgraph "Production (Railway)"
        H[User] -- Requests --> I{Prod Server (npm start)};
        I -- Serves files from --> G;
    end

    style "Development (Local)" fill:#cde,stroke:#333,stroke-width:2px
    style "CI/CD Pipeline (GitHub Actions)" fill:#f9f,stroke:#333,stroke-width:2px
    style "Production (Railway)" fill:#cfc,stroke:#333,stroke-width:2px
```

---

## Key Design Patterns

-   **Build/Deployment Pattern**: Source code lives in `public/`, and the `npm run build` script generates an optimized version in `dist/`. The CI/CD pipeline automates this process for production deployments.

-   **App Factory Pattern (Backend)**: `server.js` exports a `createApp(config)` function. This allows for the creation of configurable Express app instances, which is essential for creating isolated environments for testing.

-   **Modular Backend**: The backend code is organized into distinct modules with clear responsibilities:
    -   `config/`: For application configuration.
    -   `routes/`: For API and web route definitions.
    -   `middleware/`: For request-handling logic (e.g., auth, validation).
    -   `services/`: For business logic and database interaction.

-   **Frontend Orchestrator Pattern**: Main page scripts (`home.js`, `index.js`) act as orchestrators. They import and initialize specialized, single-responsibility modules for tasks like UI management, data fetching, and translation.

-   **Event-Driven Frontend**: Custom DOM events (e.g., `languageChanged`) are used for decoupled communication between frontend modules.

-   **Conditional Logging**: A custom logging module (`public/scripts/log.js`) wraps `console` methods to provide environment-aware logging (e.g., silencing debug messages in production).

-   **UI Table Consistency**: All table cell content in the "View Records" page is centered both vertically and horizontally for readability. The delete (trash can) icon is always red to clearly indicate destructive actions.
-   **Comprehensive Documentation**: All logical JavaScript files are documented with JSDoc comments for functions and file-level overviews to explain the purpose of each module.

-   **Secure Secret Handling**: To prevent environment-specific parsing issues with special characters, all secrets (API keys, salts) must be generated using only alphanumeric characters. This is the simplest and most robust way to ensure they are handled correctly across different platforms (e.g., local `dotenv` vs. production shell).

-   **PWA Implementation**: The application functions as a Progressive Web App, enabled by a service worker (`public/service-worker.js`).
    -   **Caching Strategy**: It uses a network-first strategy for navigation requests (HTML pages) to ensure users get the latest content when online. For static assets (CSS, JS, images), it employs a cache-first strategy for optimal performance. All core application pages and their assets are pre-cached on installation.
    -   **Offline Fallback**: If a network request for a page fails and the page is not in the cache, the service worker serves a dedicated `offline.html` page, which now includes "Retry" and "Go Back" buttons for a better user experience.
    -   **Cache Management**: The service worker manages cache versions by name (e.g., `alanui-v1`, `alanui-v2`). When the service worker activates, it deletes any caches that do not match the current `CACHE_NAME`, ensuring that old assets are purged.
    -   **Reliable Initialization**: Page scripts now wait for a `SW_READY` message from the service worker before initializing. This prevents race conditions and ensures that all assets are cached and ready before the page attempts to render, which is crucial for a reliable offline experience.

-   **Performance Patterns**:
    -   **Image Optimization**: The application prioritizes the use of modern, compressed image formats like WebP over older formats like PNG and JPG to reduce file sizes and improve load times.
    -   **On-Demand Script Loading**: Heavy JavaScript libraries that are not essential for the initial page load, such as `html2canvas.js`, are loaded dynamically only when the user interacts with a feature that requires them. This is achieved using dynamic `import()` statements.
    -   **Singleton Pattern for Modules**: Modules that should only be initialized once, like the chatbot, use a flag (e.g., `isChatbotInitialized`) to prevent redundant initializations and network requests.

---

## Critical Workflows

-   **Development**: A developer runs `npm run dev` to start a local server that serves the raw, un-optimized files from the `public` directory for easy debugging.

-   **Server Restart Procedure (Development)**: Due to caching issues, the Node.js server may need to be forcefully restarted to see changes.
    1.  Kill all running Node.js processes: `taskkill /F /IM node.exe`
    2.  Restart the development server: `npm run dev`

-   **Production Deployment**:
    1.  A push to the `main` branch triggers the GitHub Actions workflow.
    2.  The workflow installs dependencies (`npm ci`), runs tests (`npm test`), and creates a production build (`npm run build`).
    3.  Railway detects the successful CI run and deploys the application.
    4.  The Railway server uses `npm start` to run the Node.js server, which is configured to serve the optimized static files from the `dist` directory.
