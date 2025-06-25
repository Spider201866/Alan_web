import express from 'express';
// import fs from 'fs/promises'; // No longer needed
// Config is now passed as a parameter, so remove direct import
// import configFromFile from '../config/index.js';
import { validateRecord } from '../middleware/validation.js';
import { validatePassword } from '../middleware/auth.js'; // This will use its own imported config for salt/hashes
// import { readJsonFile, appendToHistory } from '../services/records.js'; // Old service
import dataService from '../services/data-service.js'; // New service

export default function apiRoutes(rateLimiter, config) {
  // config parameter might not be needed by these routes anymore
  // Added config parameter
  const router = express.Router();

  // Route: Overwrite the active record and append/update the history.
  router.post('/record-info', rateLimiter, validateRecord, (req, res, next) => {
    try {
      const record = { ...req.body }; // refreshCount is handled by DB
      if (!record.sessionId) record.sessionId = `fallback-${Date.now()}`;

      dataService.upsertRecord(record);
      res.send('OK');
    } catch (err) {
      console.error('Error in /record-info:', err); // Keep console.error for server logs
      next(err);
    }
  });

  // Route: Fetch the single active record.
  router.post('/fetch-records', rateLimiter, validatePassword, (req, res, next) => {
    // The original plan had a console.log here for non-production, can be added if needed
    // if (process.env.NODE_ENV !== 'production') {
    //   console.log('FETCH-RECORDS BODY:', req.body);
    // }
    // next(); // This next() was part of a multi-handler setup, simplified here
    try {
      const records = dataService.getActiveRecord();
      res.json(records);
    } catch (err) {
      console.error('Error in /fetch-records:', err);
      next(err);
    }
  });

  // Route: Fetch the full user history.
  router.post('/fetch-history', rateLimiter, validatePassword, (req, res, next) => {
    try {
      const history = dataService.getFullHistory();
      res.json(history);
    } catch (err) {
      next(err);
    }
  });

  // Route: Delete a record by sessionId.
  router.delete('/delete-record', rateLimiter, validatePassword, (req, res, next) => {
    try {
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
  });

  return router;
}
