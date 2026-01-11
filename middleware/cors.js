import cors from 'cors';

/**
 * Lightweight CORS middleware factory.
 * Allows requests from a provided list of origins when enabled.
 * @param {object} [options] - Configuration options.
 * @param {string[]} [options.allowedOrigins=[]] - Array of allowed origins.
 * @param {boolean} [options.enable=true] - Whether to enable CORS.
 */
export default function simpleCors(options = {}) {
  const { allowedOrigins = [], enable = true } = options;

  if (!enable) {
    return (req, res, next) => next();
  }

  const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      // and requests from origins in the allowlist.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // IMPORTANT: do not hard-block the request.
        // If an origin is not allowed, we simply omit CORS headers.
        // Browsers will still block cross-origin access without ACAO,
        // but same-origin requests won’t be rejected by the server.
        callback(null, false);
      }
    },
    credentials: true,
  };

  return cors(corsOptions);
}
