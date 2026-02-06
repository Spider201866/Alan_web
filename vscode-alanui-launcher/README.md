# Launch Alan on Local 3000 VS Code Extension

This extension adds a status bar button to VS Code that, when clicked, will:
- Run `npm start` in your workspace root (to start the local server)
- Open [http://localhost:3000](http://localhost:3000) in your default browser

## Usage

1. Open your project folder in VS Code.
2. Click the `Launch Alan on Local 3000` button in the status bar (bottom right).
3. The extension runs `npm start` and opens the site in your browser.

## Development

To build and test this extension locally:

1. Install dependencies:
   ```
   npm install
   ```
2. Compile the extension:
   ```
   npm run compile
   ```
3. Press `F5` in VS Code to launch a new Extension Development Host window.

## Notes

- The extension assumes the project uses `npm start` to launch a server on port `3000`.
- The status bar button is always visible when a workspace is open.