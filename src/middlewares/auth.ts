import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

import httpStatus from 'http-status';
import { jwtHelper } from '../helpers/jwtHelper';
import AppError from '../utils/appError';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }
    let decoded;

    try {
      decoded = jwtHelper.verifyToken(
        token,
        process.env.JWT_ACCESS_SECRET as string,
      );
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }
    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    next();
  });
};

export default auth;
