# Launch Alan on Local 3000 VSCode Extension

This extension adds a status bar button to VSCode that, when clicked, will:
- Run `npm start` in your workspace root (to start your local server)
- Open [http://localhost:3000](http://localhost:3000) in your default browser

## Usage

1. Open your project folder in VSCode.
2. Click the "🚀 Launch Alan on Local 3000" button in the status bar (bottom right).  
   The button now appears green for easy visibility.
3. The extension will run `npm start` and open your site in the browser.

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

3. Press `F5` in VSCode to launch a new Extension Development Host window.

## Notes

- The extension assumes your project uses `npm start` to launch a local server on port 3000.
- The button is always visible in the status bar when a workspace is open.
- The status bar button is green to make it stand out.
