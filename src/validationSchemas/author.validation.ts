/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { body } from 'express-validator';

// validation schema for create author

export const createAuthorValidationSchema = [
  body('name').custom((value, { req }) => {
    if (!value) {
      throw new Error('Name is required.');
    } else if (typeof value !== 'string') {
      throw new Error('Name must be a string.');
    } else if (value.trim().length === 0) {
      throw new Error('Name cannot be empty.');
    } else if (value.length > 255) {
      throw new Error('Name cannot be longer than 255 characters.');
    }
    return true;
  }),

  body('bio')
    .optional()
    .isString()
    .withMessage('Bio must be a string.')
    .notEmpty()
    .withMessage('Bio cannot be a empty string.'),

  body('birthdate')
    .isISO8601()
    .withMessage('Birthdate must be a valid date in ISO 8601 format.'),
];

// validation schema for update author
const updateAuthorValidationSchema = [
  body('name')
    .optional()
    .custom((value, { req }) => {
      if (!value) {
        throw new Error('Name is required.');
      } else if (typeof value !== 'string') {
        throw new Error('Name must be a string.');
      } else if (value.trim().length === 0) {
        throw new Error('Name cannot be empty.');
      } else if (value.length > 255) {
        throw new Error('Name cannot be longer than 255 characters.');
      }
      return true;
    }),

  body('bio')
    .optional()
    .isString()
    .withMessage('Bio must be a string.')
    .notEmpty()
    .withMessage('Bio cannot be a empty string.'),

  body('birthdate')
    .optional()
    .isISO8601()
    .withMessage('Birthdate must be a valid date in ISO 8601 format.'),
];

export const authorValidations = {
  createAuthorValidationSchema,
  updateAuthorValidationSchema,
};
