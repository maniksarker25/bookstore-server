import { body } from 'express-validator';

// validation schema for create author

export const createAuthorValidationSchema = [
  body('name')
    .isString()
    .withMessage('Name must be a string.')
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 255 })
    .withMessage('Name cannot be longer than 255 characters.'),

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
    .isString()
    .withMessage('Name must be a string.')
    .isLength({ max: 255 })
    .withMessage('Name cannot be longer than 255 characters.')
    .notEmpty()
    .withMessage("You don't add empty string for name"),

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
