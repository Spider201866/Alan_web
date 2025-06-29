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
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };

  return cors(corsOptions);
}
