import express from 'express';
// import fs from 'fs/promises'; // No longer needed
// Config is now passed as a parameter, so remove direct import
// import configFromFile from '../config/index.js';
import { validateRecord, recordValidationRules } from '../middleware/validation.js';
import { validatePasswordWithConfig } from '../middleware/auth.js';
import {
  clearAdminSessionCookie,
  requireAdminSession,
  setAdminSessionCookie,
} from '../middleware/admin-session.js';
// import { readJsonFile, appendToHistory } from '../services/records.js'; // Old service
import dataService from '../services/data-service.js'; // New service

import { sensitiveLimiter } from '../middleware/rateLimiters.js';

function applyAdminNoStoreHeaders(res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
}

function createAdminIpAllowlistMiddleware(adminAllowedIps = []) {
  const allowlist = Array.isArray(adminAllowedIps) ? adminAllowedIps : [];
  const enabled = allowlist.length > 0;

  const isIpAllowed = (ip) => {
    if (!ip) return false;
    const normalized = ip.startsWith('::ffff:') ? ip.slice('::ffff:'.length) : ip;
    return allowlist.includes(normalized);
  };

  return function enforceAdminIpAllowlist(req, res, next) {
    if (!enabled) return next();
    if (isIpAllowed(req.ip)) return next();
    return res.status(403).send('Forbidden');
  };
}

export default function apiRoutes(rateLimiterOrLimiters, configToUse = {}) {
  const generalLimiter =
    typeof rateLimiterOrLimiters === 'function'
      ? rateLimiterOrLimiters
      : rateLimiterOrLimiters?.generalLimiter;

  const recordInfoLimiter =
    typeof rateLimiterOrLimiters === 'function'
      ? rateLimiterOrLimiters
      : rateLimiterOrLimiters?.recordInfoLimiter || generalLimiter;

  const enforceAdminIpAllowlist = createAdminIpAllowlistMiddleware(configToUse.adminAllowedIps);
  const requireSession = requireAdminSession(configToUse);
  const validatePassword = validatePasswordWithConfig(configToUse);

  const router = express.Router();

  // CSRF token fetch for admin pages (only relevant when ENABLE_CSRF=true).
  // Requires a valid admin session cookie.
  router.get('/admin/csrf', enforceAdminIpAllowlist, requireSession, (req, res) => {
    applyAdminNoStoreHeaders(res);

    // CSRF middleware runs before routes and sets X-CSRF-Token on GET.
    // Echo it back in JSON as well for convenience.
    const token = res.getHeader?.('X-CSRF-Token') || null;
    res.json({ csrfToken: token });
  });

  /**
   * @route POST /api/record-info
   * @description Overwrites the active record and appends or updates the history with the provided data.
   * @access public
   */
  router.post(
    '/record-info',
    recordInfoLimiter,
    recordValidationRules,
    validateRecord,
    (req, res, next) => {
      try {
        const record = { ...req.body }; // refreshCount is handled by DB
        if (!record.sessionId) record.sessionId = `fallback-${Date.now()}`;

        dataService.upsertRecord(record);
        res.send('OK');
      } catch (err) {
        console.error('Error in /record-info:', err); // Keep console.error for server logs
        next(err);
      }
    }
  );

  /**
   * Admin session login/logout.
   * This keeps the admin password out of localStorage and off every request.
   */
  router.post(
    '/admin-login',
    sensitiveLimiter,
    enforceAdminIpAllowlist,
    validatePassword,
    (req, res) => {
      applyAdminNoStoreHeaders(res);
      setAdminSessionCookie(res, configToUse);
      res.json({ ok: true });
    }
  );

  router.post('/admin-logout', enforceAdminIpAllowlist, (req, res) => {
    applyAdminNoStoreHeaders(res);
    clearAdminSessionCookie(res);
    res.json({ ok: true });
  });

  /**
   * @route POST /api/fetch-records
   * @description Fetches the single active record. Requires a valid password.
   * @access private
   */
  router.post(
    '/fetch-records',
    sensitiveLimiter,
    enforceAdminIpAllowlist,
    validatePassword,
    (req, res, next) => {
      // The original plan had a console.log here for non-production, can be added if needed
      // if (process.env.NODE_ENV !== 'production') {
      //   console.log('FETCH-RECORDS BODY:', req.body);
      // }
      // next(); // This next() was part of a multi-handler setup, simplified here
      try {
        applyAdminNoStoreHeaders(res);
        const records = dataService.getActiveRecord();
        res.json(records);
      } catch (err) {
        console.error('Error in /fetch-records:', err);
        next(err);
      }
    }
  );

  /**
   * Admin-only records endpoints (cookie session).
   */
  router.post(
    '/admin/fetch-records',
    sensitiveLimiter,
    enforceAdminIpAllowlist,
    requireSession,
    (req, res, next) => {
      try {
        applyAdminNoStoreHeaders(res);
        const records = dataService.getActiveRecord();
        res.json(records);
      } catch (err) {
        console.error('Error in /admin/fetch-records:', err);
        next(err);
      }
    }
  );

  /**
   * @route POST /api/fetch-history
   * @description Fetches the full user history, sorted by date. Requires a valid password.
   * @access private
   */
  router.post(
    '/fetch-history',
    sensitiveLimiter,
    enforceAdminIpAllowlist,
    validatePassword,
    (req, res, next) => {
      try {
        applyAdminNoStoreHeaders(res);
        const history = dataService.getFullHistory();
        res.json(history);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/admin/fetch-history',
    sensitiveLimiter,
    enforceAdminIpAllowlist,
    requireSession,
    (req, res, next) => {
      try {
        applyAdminNoStoreHeaders(res);
        const history = dataService.getFullHistory();
        res.json(history);
      } catch (err) {
        next(err);
      }
    }
  );

  /**
   * @route DELETE /api/delete-record
   * @description Deletes a record from the history by its sessionId. Requires a valid password.
   * @access private
   */
  router.delete(
    '/delete-record',
    sensitiveLimiter,
    enforceAdminIpAllowlist,
    validatePassword,
    (req, res, next) => {
      try {
        applyAdminNoStoreHeaders(res);
        const { sessionId } = req.body;
        if (!sessionId) {
          return res.status(400).send('Session ID is required.');
        }
        dataService.deleteRecord(sessionId);
        res.send('OK');
      } catch (err) {
        console.error('Error in /delete-record:', err);
        next(err);
      }
    }
  );

  router.delete(
    '/admin/delete-record',
    sensitiveLimiter,
    enforceAdminIpAllowlist,
    requireSession,
    (req, res, next) => {
      try {
        applyAdminNoStoreHeaders(res);
        const { sessionId } = req.body;
        if (!sessionId) {
          return res.status(400).send('Session ID is required.');
        }
        dataService.deleteRecord(sessionId);
        res.send('OK');
      } catch (err) {
        console.error('Error in /admin/delete-record:', err);
        next(err);
      }
    }
  );

  return router;
}
