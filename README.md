# AlanUI Web Chatbot

This project is a web-based chatbot for users, especially in Low and Middle-Income Countries (LMICs), focusing on eye, skin, and ear health information.

<!-- Updated for green8 commit -->

For detailed architectural information, technical context, and project history, please refer to the **[Memory Bank](memory-bank/)**.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version `20.x` is recommended, see `.nvmrc`)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd AlanUI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Copy `.env.example` to a new file named `.env`.
    - Fill in the required variables.

---

## Development

### Running the Development Server
To start the server for local development, run:
```bash
npm run dev
```
This will serve the original, un-minified files from the `public/` directory. The application will be available at `http://localhost:3000`.

**Note:** Due to server-side caching, you may need to forcefully restart the server to see changes. On Windows, you can do this by running `taskkill /F /IM node.exe` before `npm run dev`.

### Running Tests
To run the full test suite, including format and translation checks:
```bash
npm test
```

### Code Formatting
To automatically format all code according to the project's style guide:
```bash
npm run format
```

---

## Production

### Building for Production
To create an optimized build for production, run:
```bash
npm run build
```
This command creates a `dist/` directory with minified and optimized assets, ready for deployment.

### Starting in Production Mode
To run the server in production mode (serving from the `dist/` directory):
```bash
npm start
```

### CI/CD
This project uses GitHub Actions for Continuous Integration and Deployment. On every push to `main`, the following happens:
1.  Tests are run.
2.  If tests pass, a production build is created.
3.  The application is deployed to Railway.

For more details, see `.github/workflows/ci-cd.yml`.

---

## Progressive Web App (PWA) Features

This application is a Progressive Web App, providing a more reliable and engaging user experience. Key benefits include:

-   **Installable**: Can be added to your device's home screen for quick and easy access, just like a native app.
-   **Offline Capable**: The core application and previously accessed data are available even without an internet connection, which is crucial for users in low-connectivity areas.
-   **Enhanced Performance**: Assets are cached locally, leading to faster load times and a smoother experience on subsequent visits. The application also uses modern image formats like WebP and loads heavy scripts on demand to further improve performance.

This is made possible by a `service-worker.js` that manages caching and a `manifest.json` file that defines the app's appearance and behavior.

---

## Environment Variable Best Practices

A critical lesson learned during development is to be extremely careful with special characters in environment variables. Differences in how shells (like Bash) and libraries (like `dotenv`) interpret characters such as `$` and `#` can lead to "works on my machine" bugs that are difficult to debug.

To avoid this, follow these two rules for secrets like API keys or salts:

1.  **The Simple Way (Highly Recommended)**: Generate secrets using only **alphanumeric characters** (a-z, A-Z, 0-9). A 64-character hex string is a perfect example, as it's safe to use anywhere without quoting.
    -   *Example*: `crypto.randomBytes(32).toString('hex')`

2.  **The Bulletproof Way (For Complex Secrets)**: If you must use special characters, **encode the secret in Base64**. Store the Base64 string as the environment variable, and have your application decode it before use. This is the industry-standard method for safely handling complex data in text-based systems.

---

## Project Documentation

The project's JavaScript files have been thoroughly documented to improve code clarity and maintainability.

- **JSDoc Comments:** All logical functions and classes now include JSDoc blocks describing their purpose, parameters, and return values.
- **File-level Overviews:** Each documented file includes a comment at the top providing a high-level overview of its role.

### Documented Directories
The following directories have been fully documented:
- `config/`
- `middleware/`
- `public/scripts/`
- `routes/`
- `scripts/`
- `services/`
- `tests/`

Key root-level files such as `server.js` and `eslint.config.js` have also been documented.
