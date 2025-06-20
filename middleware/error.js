import path from 'path';
import { fileURLToPath } from 'url';

// To resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Assuming middleware/error.js is in AlanUI/middleware/error.js
// __dirname will be AlanUI/middleware
// root will be AlanUI/
const root = path.resolve(__dirname, '..');

/**
 * Middleware: A simple error handler for async routes.
 * Catches errors from async route handlers and passes them to the global error handler.
 */
export const handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Middleware: Handles 404 Not Found errors.
 */
export function notFound(req, res) {
  // Use resolved root path to correctly locate public/404.html
  res.status(404).sendFile(path.join(root, 'public', '404.html'));
}

/**
 * Middleware: Global error handler.
 */
// eslint-disable-next-line no-unused-vars
export function globalErrorHandler(err, req, res, _next) {
  console.error('GLOBAL ERROR:', err.stack || err); // Log stack for better debugging
  // Send a more generic error message to the client for security
  res.status(err.status || 500).send('Something went wrong!');
}
