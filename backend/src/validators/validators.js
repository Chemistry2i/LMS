const { body, validationResult } = require('express-validator');
const { ValidationError } = require('../exceptions/AppError');

// Validation handler middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }
  next();
};

// Auth Validators
const registerValidator = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim().notEmpty().withMessage('Last name is required'),
  handleValidationErrors,
];

const loginValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

// Book Validators
const bookValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('author').trim().notEmpty().withMessage('Author is required'),
  body('isbn').optional().trim(),
  body('publication_year').optional().isInt(),
  handleValidationErrors,
];

// Category Validators (Greenstone-inspired: rich metadata support)
const categoryValidator = [
  body('category_name').trim().notEmpty().withMessage('Category name is required'),
  body('description').optional().trim(),
  handleValidationErrors,
];

// Reservation Validators (KYU Space-inspired: resource discovery)
const reservationValidator = [
  body('bookId').notEmpty().withMessage('Book ID is required').isInt().withMessage('Book ID must be a number'),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  registerValidator,
  loginValidator,
  bookValidator,
  categoryValidator,
  reservationValidator,
};
