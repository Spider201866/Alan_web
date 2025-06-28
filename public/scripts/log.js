// public/scripts/log.js
// A simple logging utility that silences info and debug messages in production.

// Determine if we are in the production environment by checking the hostname.
const isProduction = window.location.hostname === 'alan.up.railway.app';

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
