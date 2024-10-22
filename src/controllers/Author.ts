import httpStatus from 'http-status';
import AuthorModel from '../models/Author';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import AppError from '../utils/appError';

// create author ----------
const createAuthor = catchAsync(async (req, res) => {
  const result = await AuthorModel.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Author added successfully',
    data: result,
  });
});

// get single author ----------------
const getSingleAuthor = catchAsync(async (req, res) => {
  const result = await AuthorModel.findById(Number(req.params.id));
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author retrieved successfully',
    data: result,
  });
});

// get all author --------------------
const getAllAuthor = catchAsync(async (req, res) => {
  const page = parseInt(req?.query?.page as string, 10) || 1;
  const limit = parseInt(req?.query?.limit as string, 10) || 10;
  const searchParams = (req.query.searchParams as string) || '';
  const result = await AuthorModel.findAll(page, limit, searchParams);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Authors retrieved successfully',
    meta: {
      page: result?.page,
      limit: result?.limit,
      total: result?.total,
    },
    data: result?.authors,
  });
});

// update author --------------------

const updateAuthor = catchAsync(async (req, res) => {
  const id = Number(req.params.id);
  const updatedAuthorData = req.body;

  const author = await AuthorModel.findById(id);
  if (!author) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Invalid author id,this author does not exist',
    );
  }
  const result = await AuthorModel.update(id, updatedAuthorData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author updated successfully',
    data: result,
  });
});

// delete author ---------
const deleteAuthor = catchAsync(async (req, res) => {
  const id = Number(req.params.id);

  const author = await AuthorModel.findById(id);
  if (!author) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Invalid author id,this author does not exist',
    );
  }
  await AuthorModel.delete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author deleted successfully',
    data: null,
  });
});

export const authorControllers = {
  createAuthor,
  getSingleAuthor,
  getAllAuthor,
  updateAuthor,
  deleteAuthor,
};
