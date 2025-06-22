import express from 'express';
import path from 'path';
// Config is now passed as a parameter, so remove direct import
// import configFromFile from '../config/index.js';

export default function webRoutes(config) {
  const router = express.Router();
  const basePath = process.env.NODE_ENV === 'production' ? path.join(config.paths.public, '..', 'dist') : config.paths.public;

  router.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'));
  });

  router.get('/view-records', (req, res) => {
    res.sendFile(path.join(basePath, 'view-records.html'));
  });

  return router;
}
