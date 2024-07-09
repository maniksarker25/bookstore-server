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
  const page = parseInt(req?.query?.page as string, 10) || 1;
  const limit = parseInt(req?.query?.limit as string, 10) || 10;
  const searchParams = req?.query?.searchParams as string | '';
  const result = await BookModal.findAll(page, limit, searchParams);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: {
      page: result?.page,
      limit: result?.limit,
      total: result?.total,
    },
    data: result?.books,
  });
});

// get single book ----------------
const getSingleBook = catchAsync(async (req, res) => {
  const result = await BookModal.findById(Number(req.params.id));
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Book not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

// get books for a specific author ----------------
const getBooksForSpecificAuthor = catchAsync(async (req, res) => {
  const authorId = Number(req.params.id);
  const authorData = await AuthorModel.findById(authorId);
  if (!authorData) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid author id , this author does not exist',
    );
  }
  const result = await BookModal.findByAuthorId(authorId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully for a specific author',
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
  if (updatedBookData?.author_id) {
    const author = await AuthorModel.findById(
      Number(updatedBookData.author_id),
    );
    if (!author) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Invalid author id, this author doest not exist',
      );
    }
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
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Invalid book id, this book does not exist',
    );
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
  getBooksForSpecificAuthor,
  updateBook,
  deleteBook,
};
