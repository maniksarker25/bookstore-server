import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const success = false;
    const statusCode = 400;
    const message = errors.array()[0].msg;
    const errorDetails = errors.array();
    const formattedError = { success, statusCode, message, errorDetails };
    return res.status(400).json(formattedError);
  }
  next();
};
