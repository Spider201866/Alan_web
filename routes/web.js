import express from 'express';
// import path from 'path'; // No longer needed
// Config is now passed as a parameter, so remove direct import
// import configFromFile from '../config/index.js';

export default function webRoutes() {
  const router = express.Router();
  // const basePath = process.env.NODE_ENV === 'production' ? path.join(config.paths.public, '..', 'dist') : config.paths.public;

  // express.static in server.js will handle serving all static files,
  // including index.html for the '/' route.
  // The explicit routes were causing issues and are not needed.

  return router;
}
