import AuthModel from '../models/Auth';
import catchAsync from '../utils/catchAsync';
import bcrypt, { compare } from 'bcrypt';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../utils/appError';
import jwt from 'jsonwebtoken';
const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  userData.password = await bcrypt.hash(userData?.password, 12);
  const result = await AuthModel.create(userData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User register successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  // Find user by email
  const user = await AuthModel.findByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User does not exist');
  }
  // Compare passwords
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }

  // Generate access token
  const accessToken = jwt.sign(
    { userId: user?.id, email: user?.email },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
    },
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken },
  });
});

export const authControllers = {
  registerUser,
  loginUser,
};
