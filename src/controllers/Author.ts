import httpStatus from 'http-status';
import AuthorModel from '../models/Author';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const createAuthor = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await AuthorModel.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Author added successfully',
    data: result,
  });
});

const getAllAuthor = catchAsync(async (req, res) => {
  const result = await AuthorModel.findAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author retrieved successfully',
    data: result,
  });
});
export const authorControllers = {
  createAuthor,
  getAllAuthor,
};
