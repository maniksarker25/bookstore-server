/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { body } from 'express-validator';

// create book validation schema here
const createBookValidationSchema = [
  body('title').custom((value, { req }) => {
    if (!value) {
      throw new Error('Title is required.');
    } else if (typeof value !== 'string') {
      throw new Error('Title must be a string.');
    } else if (value.trim().length === 0) {
      throw new Error('Title cannot be empty.');
    } else if (value.length > 255) {
      throw new Error('Title cannot be longer than 255 characters.');
    }
    return true;
  }),

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
    .custom((value, { req }) => {
      if (!value) {
        throw new Error('Title is required.');
      } else if (typeof value !== 'string') {
        throw new Error('Title must be a string.');
      } else if (value.trim().length === 0) {
        throw new Error('Title cannot be empty.');
      } else if (value.length > 255) {
        throw new Error('Title cannot be longer than 255 characters.');
      }
      return true;
    }),

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
