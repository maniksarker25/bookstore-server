import { body } from 'express-validator';

export const registerUserValidationSchema = [
  body('username').custom((value) => {
    if (!value) {
      throw new Error('Username is required.');
    } else if (typeof value !== 'string') {
      throw new Error('Username must be a string.');
    } else if (value.trim().length === 0) {
      throw new Error('Username cannot be empty.');
    } else if (value.length > 255) {
      throw new Error('Username cannot be longer than 255 characters.');
    }
    return true;
  }),

  body('email')
    .isEmail()
    .withMessage('Email is not valid.')
    .custom((value) => {
      if (!value) {
        throw new Error('Email is required.');
      }
      return true;
    }),

  body('password').custom((value) => {
    if (!value) {
      throw new Error('Password is required.');
    } else if (typeof value !== 'string') {
      throw new Error('Password must be a string.');
    } else if (value.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    return true;
  }),
];

export const authValidations = {
  registerUserValidationSchema,
};
