import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import AppError from '../utils/appError';
import BookModal from '../models/Book';

const createBook = catchAsync(async (req, res) => {
  const result = await BookModal.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBook = catchAsync(async (req, res) => {
  const result = await BookModal.findAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const updatedBookData = req.body;

  const book = await BookModal.findById(id);
  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND, 'Book does not exits');
  }
  const result = await BookModal.update(id, updatedBookData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const id = Number(req.params.id);

  const book = await BookModal.findById(id);
  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND, 'Book  not found');
  }
  await BookModal.delete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: null,
  });
});

export const authorControllers = {
  createBook,
  getAllBook,
  updateBook,
  deleteBook,
};
