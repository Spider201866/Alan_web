// middleware/rateLimiters.js
// This file defines rate-limiting middleware for various parts of the application.

import rateLimit from 'express-rate-limit';

/**
 * A general rate limiter for most API endpoints.
 * Limits each IP to 100 requests per 15 minutes.
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * A stricter rate limiter for sensitive endpoints like authentication.
 * Limits each IP to 10 requests per 15 minutes.
 */
export const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Much stricter: 10 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests to this endpoint. Please try again later.',
});
