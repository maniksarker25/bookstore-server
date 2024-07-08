/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { validationResult } from 'express-validator';
import AppError from '../error/appError';

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  //   let errorMessage = '';
  let errorDetails = {};
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    statusCode = httpStatus.BAD_REQUEST;
    message = 'Validation error';
    errorDetails = errors.array().map((error) => ({
      field: error.type,
      message: error.msg,
    }));
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err;
  }

  res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
