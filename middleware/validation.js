/**
 * Middleware: Validates the structure and types of incoming record data.
 * This middleware is part of the legacy "Secure Record Server" functionality
 * and is not directly used by the primary chatbot interface.
 */
export function validateRecord(req, res, next) {
  const r = req.body;
  const errors = [];
  if (r.latitude !== undefined && r.latitude !== null && isNaN(parseFloat(r.latitude)))
    errors.push('latitude must be numeric or null');
  if (r.longitude !== undefined && r.longitude !== null && isNaN(parseFloat(r.longitude)))
    errors.push('longitude must be numeric or null');
  if (r.sessionId !== undefined && typeof r.sessionId !== 'string')
    errors.push('sessionId must be a string');
  if (r.dateTime !== undefined && typeof r.dateTime !== 'string')
    errors.push('dateTime must be a string');
  if (r.area !== undefined && typeof r.area !== 'string') errors.push('area must be a string');
  if (errors.length) return res.status(400).json({ errors });
  next();
}
