import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';


const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.param,
      message: error.msg,
    }));
    return next(new AppError(400, 'Validation failed', formattedErrors));
  }
  next();
};

export default validateRequest;
