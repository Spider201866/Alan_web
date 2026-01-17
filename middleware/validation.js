/**
 * Middleware: Validates and sanitizes the structure and types of incoming record data.
 * Uses express-validator for robust input validation and sanitization.
 */
import { body, validationResult } from 'express-validator';

export const recordValidationRules = [
  body('latitude')
    .optional({ nullable: true })
    .isFloat()
    .withMessage('latitude must be numeric or null')
    .toFloat(),
  body('longitude')
    .optional({ nullable: true })
    .isFloat()
    .withMessage('longitude must be numeric or null')
    .toFloat(),
  body('sessionId').optional().isString().withMessage('sessionId must be a string').trim().escape(),
  body('dateTime').optional().isString().withMessage('dateTime must be a string').trim().escape(),
  body('area').optional().isString().withMessage('area must be a string').trim().escape(),
  body('name')
    .optional()
    .isString()
    .withMessage('name must be a string')
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage('name must be between 1 and 100 characters'),
  body('contact')
    .optional()
    .isString()
    .withMessage('contact must be a string')
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage('contact must be between 3 and 100 characters'),
  body('contactInfo')
    .optional()
    .isString()
    .withMessage('contactInfo must be a string')
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage('contactInfo must be between 3 and 100 characters'),
  body('password')
    .optional()
    .isString()
    .withMessage('password must be a string')
    .isLength({ min: 6, max: 100 })
    .withMessage('password must be between 6 and 100 characters'),
];

/**
 * Express middleware that checks the result of the validation rules.
 * If there are validation errors, it sends a 400 response with the error messages.
 * Otherwise, it passes control to the next middleware.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
export function validateRecord(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
  }
  next();
}
