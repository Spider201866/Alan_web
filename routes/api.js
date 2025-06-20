import express from 'express';
import fs from 'fs/promises';
// Config is now passed as a parameter, so remove direct import
// import configFromFile from '../config/index.js';
import { validateRecord } from '../middleware/validation.js';
import { validatePassword } from '../middleware/auth.js'; // This will use its own imported config for salt/hashes
import { readJsonFile, appendToHistory } from '../services/records.js';

export default function apiRoutes(rateLimiter, config) {
  // Added config parameter
  const router = express.Router();

  router.post('/record-info', rateLimiter, validateRecord, async (req, res, next) => {
    try {
      const record = { ...req.body, refreshCount: 1 };
      if (!record.sessionId) record.sessionId = `fallback-${Date.now()}`;

      await appendToHistory(record, config.paths.userHistory); // Use passed config
      await fs.writeFile(config.paths.userInfo, JSON.stringify([record], null, 2) + '\n'); // Use passed config
      res.send('OK');
    } catch (err) {
      next(err);
    }
  });

  router.post('/fetch-records', rateLimiter, validatePassword, async (req, res, next) => {
    try {
      res.json(await readJsonFile(config.paths.userInfo)); // Use passed config
    } catch (err) {
      next(err);
    }
  });

  router.post('/fetch-history', rateLimiter, validatePassword, async (req, res, next) => {
    try {
      res.json(await readJsonFile(config.paths.userHistory)); // Use passed config
    } catch (err) {
      next(err);
    }
  });

  return router;
}
