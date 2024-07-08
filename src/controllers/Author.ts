import httpStatus from 'http-status';
import AuthorModel from '../models/Author';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import AppError from '../utils/appError';

const createAuthor = catchAsync(async (req, res) => {
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

const updateAuthor = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const updatedAuthorData = req.body;

  const author = await AuthorModel.findById(id);
  if (!author) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }
  const result = await AuthorModel.update(id, updatedAuthorData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author updated successfully',
    data: result,
  });
});

const deleteAuthor = catchAsync(async (req, res) => {
  await AuthorModel.delete(Number(req.params.id));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author deleted successfully',
    data: null,
  });
});

export const authorControllers = {
  createAuthor,
  getAllAuthor,
  updateAuthor,
  deleteAuthor,
};
