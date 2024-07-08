import { body } from 'express-validator';

export const createAuthorValidationSchema = [
  body('name')
    .trim()
    .isString()
    .withMessage('Name must be a string.')
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 255 })
    .withMessage('Name cannot be longer than 255 characters.'),

  body('bio').optional().isString().withMessage('Bio must be a string.'),

  body('birthdate')
    .isISO8601()
    .withMessage('Birthdate must be a valid date in ISO 8601 format.'),
];

export const authorValidations = {
  createAuthorValidationSchema,
};
