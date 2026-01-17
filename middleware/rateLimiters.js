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

/**
 * Rate limiter for the public record ingestion endpoint.
 * The site is public, so we can't require a secret here, but we can reduce abuse.
 */
export const recordInfoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60, // 60 requests per 15 min per IP (~4/min)
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many submissions. Please try again later.',
});

/**
 * Rate limiter for Flowise proxy endpoints.
 */
export const flowiseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests. Please try again later.',
});

/**
 * Rate limiter for the OSM tile proxy.
 */
export const osmTilesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many tile requests. Please try again later.',
});

/**
 * Rate limiter for admin CSRF token fetch.
 */
export const adminCsrfLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many CSRF token requests. Please try again later.',
});
