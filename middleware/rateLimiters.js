import rateLimit from 'express-rate-limit';

// General API rate limiter (already in use globally)
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for sensitive endpoints (e.g., login, password reset, fetch-records)
export const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Much stricter: 10 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests to this endpoint. Please try again later.',
});
