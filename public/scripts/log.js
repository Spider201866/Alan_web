// Alan UI - log.js | 14th January 2026, WJW
// public/scripts/log.js
// A simple logging utility that silences info and debug messages in production.
//
// IMPORTANT:
// - Do NOT rely on deployment hostnames (they can change).
// - In production, `scripts/build.js` injects:
//     <meta name="alanui-env" content="production">
//   into each HTML file in `dist/`.
// - In development, we serve directly from `public/`, so the meta tag will
//   typically be missing and logs remain enabled.

/**
 * Returns true if this page was built for production.
 *
 * You can override this at runtime for debugging by setting:
 *   localStorage.setItem('alanui:debug', '1')
 */
function isProductionBuild() {
  try {
    if (localStorage.getItem('alanui:debug') === '1') return false;
  } catch {
    // localStorage may be unavailable; ignore and continue.
  }

  const env = document.querySelector('meta[name="alanui-env"]')?.getAttribute('content');
  return env === 'production';
}

const isProduction = isProductionBuild();

// A "no-operation" function that does nothing. This will be used to silence logs.
const noOp = () => {};

// The main log object that will be exported and used throughout the application.
const log = {
  /**
   * Logs standard informational messages. Silenced in production.
   * @param {...any} args - Messages or objects to log.
   */
  info: isProduction ? noOp : console.log.bind(console),

  /**
   * Logs verbose debugging messages. Silenced in production.
   * @param {...any} args - Messages or objects to log.
   */
  debug: isProduction ? noOp : console.log.bind(console),

  /**
   * Logs warning messages. ALWAYS active.
   * @param {...any} args - Messages or objects to log.
   */
  warn: console.warn.bind(console),

  /**
   * Logs error messages. ALWAYS active.
   * @param {...any} args - Messages or objects to log.
   */
  error: console.error.bind(console),
};

// Export the log object for use in other modules.
export default log;
