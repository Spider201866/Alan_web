import express from 'express';
import path from 'path';
// Config is now passed as a parameter, so remove direct import
// import configFromFile from '../config/index.js';

export default function webRoutes(config) {
  // Added config parameter
  const router = express.Router();

  router.get('/', (req, res) => {
    res.sendFile(path.join(config.paths.public, 'index.html')); // Use passed config
  });

  router.get('/view-records', (req, res) => {
    res.sendFile(path.join(config.paths.public, 'view-records.html')); // Use passed config
  });

  return router;
}
