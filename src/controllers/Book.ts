import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import BookModal from '../models/Book';
import AuthorModel from '../models/Author';
import AppError from '../utils/appError';

// create book ---------
const createBook = catchAsync(async (req, res) => {
  const payload = req.body;
  const authorData = await AuthorModel.findById(Number(payload?.author_id));
  if (!authorData) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid author id, this author doest not exist',
    );
  }

  const result = await BookModal.create(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

// get all book --------
const getAllBook = catchAsync(async (req, res) => {
  const result = await BookModal.findAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result,
  });
});

// get single book ----------------
const getSingleBook = catchAsync(async (req, res) => {
  const result = await BookModal.findById(Number(req.params.id));
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

// update book ----------------
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

// delete book ------------------
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

export const bookControllers = {
  createBook,
  getSingleBook,
  getAllBook,
  updateBook,
  deleteBook,
};
