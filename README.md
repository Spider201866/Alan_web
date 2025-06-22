# AlanUI Web Chatbot

This project is a web-based chatbot for users, especially in Low and Middle-Income Countries (LMICs), focusing on eye, skin, and ear health information.

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
