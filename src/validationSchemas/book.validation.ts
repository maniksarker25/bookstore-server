import { body } from 'express-validator';

// create book validation schema here ---------
const createBookValidationSchema = [
  body('title')
    .isString()
    .withMessage('Title must be a string.')
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ max: 255 })
    .withMessage('Title cannot be longer than 255 characters.'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string.'),

  body('published_date')
    .isISO8601()
    .withMessage('Published date must be a valid date in ISO 8601 format.')
    .notEmpty()
    .withMessage('Published date is required.'),

  body('author_id')
    .isInt({ min: 1 })
    .withMessage('Author ID must be a positive integer.')
    .notEmpty()
    .withMessage('Author ID is required.'),
];

// update book validation schema here ---------------
const updateBookValidationSchema = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string.')
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ max: 255 })
    .withMessage('Title cannot be longer than 255 characters.'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string.'),

  body('published_date')
    .optional()
    .isISO8601()
    .withMessage('Published date must be a valid date in ISO 8601 format.')
    .notEmpty()
    .withMessage('Published date is required.'),

  body('author_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Author ID must be a positive integer.'),
];

export const bookValidations = {
  createBookValidationSchema,
  updateBookValidationSchema,
};
